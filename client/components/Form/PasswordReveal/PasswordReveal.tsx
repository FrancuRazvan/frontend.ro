import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './PasswordReveal.module.scss';

interface Props {
  name?: string;
  autoComplete?: string;
  passwordError?: boolean;
}

export default function ({
  name = 'password',
  autoComplete = 'on',
  passwordError = false,
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles['password-reveal']}>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          name={name}
          autoComplete={autoComplete}
        />

        <button
          type="button"
          className="absolute text-grey"
          onClick={() => setVisible(!visible)}
          title={visible ? 'Hide password' : 'Show password'}
        >
          <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />
        </button>
      </div>
      {passwordError
        ? <span className="text-red text-bold">🧙‍ Nu poți trece mai departe decât cu o parolă!</span>
        : null}
    </div>
  );
}
