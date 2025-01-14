![frontend.ro social banner](https://frontend.ro/main-seo-image.jpg)

## FrontEnd.ro's open-source codebase and curriculum

[FrontEnd.ro](https://FrontEnd.ro) is an **open-source** & **community driven** initiative to teach FrontEnd development. Read more on the [website](https://FrontEnd.ro) and please share the news ^^^

<br />
<hr />

## Install & Run 

1. Install all the dependencies by running `yarn` in the root folder.
2. Create a `.env` file in root and add the following line 

```
ENDPOINT=https://frontend-ro-dev.herokuapp.com/api
```

3. Run `yarn dev`. This will run the FrontEnd locally and connect you to the development server.
4. If you want to do server-side work you're gonna need to run the server and MongoDB on your local machine as well.  For this to happen you're gonna need to add the following variables inside `.env`:

```
# App environment
APP_ENV=development

# Auth
SALT_ROUNDS=
TOKEN_ALGORITHM=
TOKEN_SECRET=
DB_CONNECT=

# Aws
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
CLOUDFRONT_UPLOAD=

# Postmark
EMAIL_WELCOME_TEMPLATE=
EMAIL_TOKEN=

ENDPOINT=https://frontend-ro-dev.herokuapp.com/api
```

Then run the local server using `yarn dev:local`. Get in touch with us for more details.

## License

This project has a dual-licence split between the source code of the UI components used and the curriculum content.

The source code of the UI components is licensed under [MIT](https://github.com/FrontEnd-ro/frontend.ro/blob/master/LICENSE).

The curriculum belongs to our contributors and is licensed under [Attribution-ShareAlike 4.0 International](https://github.com/FrontEnd-ro/frontend.ro/blob/master/frontend-ssr/curriculum/LICENSE.md). You're free to use it if you're teaching these topics as long as you provide attribution to the writer/owner.

### Contributors

This project wouldn't be possible without our awesome contributors. Thank you >:D<

<table>
    <tr>
        <td align="center">
            <a href="https://iampava.com"><img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/iampava_2.jpg" width="120px;" alt="Alexandru Păvăloi"/><br /><sub><b>Alexandru Păvăloi</b></sub></a></td>
        <td align="center">
            <a href="https://github.com/andreeatoma"><img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/andreeatoma.jpg" width="120px;" alt="Diana Toma"/><br /><sub><b>Diana Toma</b></sub></a></td>
        <td align="center">
            <a href="https://github.com/catalinpopusoi">
                <img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/catalinpopusoi.jpg" width="120px;" alt="Cătălin Popușoi"/><br /><sub><b>Cătălin Popușoi</b></sub></a></td>
        <td align="center">
            <a href="https://github.com/MarianGeorgeMorosac">
                <img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/georgemarianmorosac.jpg" width="120px;" alt="Marian George Morosac"/><br /><sub><b>Marian Morosac</b></sub></a></td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://github.com/SirCQQ"><img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/cristiangatu.jpg" width="120px;" alt="Cristian Gațu"/><br /><sub><b>Cristian Gațu</b></sub></a></td>
        <td align="center">
            <a href="https://github.com/juppsy"><img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/juppsy.jpg" width="120px;" alt="Sebastian Latkolic"/><br /><sub><b>Sebastian Latkolic</b></sub></a></td>
        <td align="center">
            <a href="https://github.com/nmaties/"><img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/nmaties.jpg" width="120px;" alt="Nicolae Maties"/><br /><sub><b>Nicolae Matieș</b></sub></a></td>
        <td align="center">
            <a href="https://www.linkedin.com/in/danielhutanu22/"><img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/danielhutanu.jpg" width="120px;" alt="Ira Melnic"/><br /><sub><b>Daniel Huțanu</b></sub></a></td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://www.facebook.com/melnic.ira/"><img src="https://raw.githubusercontent.com/FrontEnd-ro/frontend.ro/master/client/public/images/contributors/iramelnic.jpg" width="120px;" alt="Ira Melnic"/><br /><sub><b>Ira Melnic</b></sub></a></td>
    </tr></table>

<br />

If you wanna **lend a helping hand**, get in touch with us and let's build this together!

<hr />

[Twitter](https://twitter.com/FrontEndRo) | [Facebook](https://facebook.com/FrontEndRo)