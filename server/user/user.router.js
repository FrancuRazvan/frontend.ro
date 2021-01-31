const express = require('express');
const bcrypt = require('bcrypt');
const postmark = require('postmark');
const UserModel = require('./user.model');
const { ServerError, setTokenCookie, MAX_NAME_LENGTH } = require('../ServerUtils');
const { PrivateMiddleware } = require('../Middlewares');

const userRouter = express.Router();

userRouter.get('/check-username/:username', async function checkUsername(req, res) {
  const { username } = req.params;

  const user = await UserModel.findUserBy({ username });

  if (user) {
    res.status(200).end();
  } else {
    new ServerError(404, `Username ${username} is not registered`).send(res);
  }
})

userRouter.get('/ping', async function pingCurrentuser(req, res) {
  const { token } = req.cookies;

  const notAuthenticatedArror = new ServerError(401, 'Not authenticated');

  if (!token) {
    throw notAuthenticatedArror;
  }

  const user = await UserModel.ping(token);

  if (!user) {
    new ServerError(404, 'User doesn\'t exist any more').send(res);
  } else {
    res.json(UserModel.sanitize(user));
  }
})

userRouter.post('/login', async function login(req, res) {
  const { emailOrUsername, password } = req.body;
  const user = await UserModel.getUser({
    email: emailOrUsername,
    username: emailOrUsername,
  });

  if (!user) {
    new ServerError(
      400,
      '⛔ Nu există nici un utilizator cu acest email/username!',
    ).send(res);
    return
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    new ServerError(400, '⛔ Parola e greșită!').send(res);
    return
  }

  // Create and set JTW as cookie
  const token = UserModel.generateJwtForUser(user._id);
  setTokenCookie(token, res);

  res.json(UserModel.sanitize(user));
})

userRouter.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send();
});

userRouter.post('/register', async function register(req, res) {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    throw new ServerError(400, '⛔ Nu te poți înregistra fără email, username și parolă!');
  }

  if (!/^.+@.+[.].+$/.test(email)) {
    new ServerError(400, '⛔ Nu te poți înregistra fără un email valid!').send(res);
    return
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    new ServerError(
      400,
      '⛔ Username-ul poate să conțină doar litere și cifre!',
    ).send(res);
    return
  }

  const existingUser = await UserModel.getUser({ email, username });
  if (existingUser) {
    new ServerError(400, '⛔ Ai uitat că te-ai înregistrat cu acest email?').send(res);
  }

  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  const user = await UserModel.create({
    email,
    username,
    password: hashedPassword,
    avatar: `https://joeschmoe.io/api/v1/${username}`,
  });

  // Create and set JTW as cookie
  const token = UserModel.generateJwtForUser(user._id);
  setTokenCookie(token, res);

  res.json(UserModel.sanitize(user));
})

userRouter.post('/name', [
  PrivateMiddleware,
  async function updateName(req, res) {
    const name = req.body.name.toString().trim();
    const { password, user } = req.body;

    if (name.length === 0) {
      new ServerError(400, 'Numele nu poate fi gol').send(res);
      return;
    }

    if (name.length > MAX_NAME_LENGTH) {
      new ServerError(400, 'Ești cumva extraterestru? Atunci cum de ai un nume mai lung de 255 caractere').send(res);
      return;
    }

    try {
      const updatedUser = await updateUserFields({ _id: user._id, username: user.username, password }, { name });
      res.json(UserModel.sanitize(updatedUser));
    } catch (err) {
      err.send(res); // Err is of type ServerError
    }
  }
]);

userRouter.post('/username', [
  PrivateMiddleware,
  async function updateUsername(req, res) {
    const username = req.body.username.toString().trim();
    const { password, user } = req.body;


    const { result, reason } = UserModel.validateUsername(username);

    if (!result) {
      new ServerError(400, reason).send(res);
      return;
    }

    try {
      const updatedUser = await updateUserFields({ _id: user._id, username: user.username, password }, {
        username,
        avatar: `https://joeschmoe.io/api/v1/${username}`
      });
      res.json(UserModel.sanitize(updatedUser));
    } catch (err) {
      err.send(res); // Err is of type ServerError
    }
  }
]);

userRouter.post('/email', [
  PrivateMiddleware,
  async function updateEmail(req, res) {
    const email = req.body.email.toString().trim();
    const { password, user } = req.body;

    if (email.length === 0) {
      new ServerError(400, 'Email-ul nu poate fi gol').send(res);
      return;
    }

    if (!/^.+@.+[.].+$/.test(email)) {
      new ServerError(400, '⛔ Noul email trebuie să fie valid!').send(res);
      return
    }

    try {
      const updatedUser = await updateUserFields({ _id: user._id, username: user.username, password }, { email });
      res.json(UserModel.sanitize(updatedUser));
    } catch (err) {
      err.send(res); // Err is of type ServerError
    }
  }
]);

userRouter.post('/password', [
  PrivateMiddleware,
  async function updateEmail(req, res) {
    const newPassword = req.body.newPassword.toString().trim();
    const { password, user } = req.body;

    if (newPassword.length === 0) {
      new ServerError(400, 'Noua parolă nu poate fi goală').send(res);
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, +process.env.SALT_ROUNDS);

    try {
      const updatedUser = await updateUserFields({ _id: user._id, username: user.username, password }, {
        password: hashedPassword
      });
      res.json(UserModel.sanitize(updatedUser));
    } catch (err) {
      err.send(res); // Err is of type ServerError
    }
  }
]);

userRouter.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    new ServerError(400, 'Email-ul și numele tău sunt obligatorii!').send(res);
  }

  const alreadyRegistered = await UserModel.findUserBy({ email });
  if (alreadyRegistered) {
    new ServerError(400, 'Ești deja înregistrat ca utilizator!').send(res);
  }

  const alreadySubscribed = await SubscribeModel.exists(email);
  if (alreadySubscribed) {
    new ServerError(400, 'Hmm, încerci să te abonezi încă o data...🤔').send(res);
  }

  await SubscribeModel.subscribe({ name, email });

  if (process.env.NODE_ENV === 'production') {
    try {
      const client = new postmark.ServerClient(process.env.EMAIL_TOKEN);

      await client.sendEmailWithTemplate({
        To: email,
        From: 'hello@frontend.ro',
        TemplateId: Number(process.env.EMAIL_WELCOME_TEMPLATE),
        TemplateModel: {
          name,
          sender_name: 'Păvă',
        },
      });
    } catch (err) {
      console.error('[sendEmailWithTemplate]', err, { name, email });
    }
  } else {
    console.log('[SubscribeEmail] Not on production so email wasn\'t sent.')
  }

  res.json({
    name,
    email,
  });
})

userRouter.delete('/', [PrivateMiddleware], async function deleteAccount(req, res) {
  const { user, password } = req.body;

  const areCredentialsOk = await UserModel.verify(user.username, password);

  if (!areCredentialsOk) {
    new ServerError(403, 'Credențialele introduse nu se potrivesc cu contul tău').send(res);
    return;
  }

  await UserModel.delete(user._id);
  res.status(200).send();
});

async function updateUserFields({ _id, username, password }, fields) {
  let areCredentialsOk = false;

  try {
    areCredentialsOk = await UserModel.verify(username, password);
  } catch (err) {
    throw new ServerError(500, "Oops! Încearcă din nou");
  }

  if (!areCredentialsOk) {
    throw new ServerError(403, 'Credențialele introduse nu se potrivesc cu contul tău');
  }

  return UserModel.update(_id, fields);
}

module.exports = userRouter