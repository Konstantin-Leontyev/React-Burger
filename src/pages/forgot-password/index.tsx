import React, {FormEvent} from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../pages.module.css';

import { TPasswordConformationData } from "../../components/utils/types";
import { sendPasswordResetConformationEmail } from '../../components/utils/api';
import { useForm } from '../../components/utils/useForm';

export function ForgotPassword(): React.JSX.Element {
  const navigate = useNavigate();
  const { formData, handleOnChange } = useForm<TPasswordConformationData>({} as TPasswordConformationData);

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendPasswordResetConformationEmail(formData)
      .then((response) => {
        if (response.success) {
          localStorage.setItem('forgot-password', 'true');
          navigate('/reset-password');
        }
    });
  }

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <span className="text text_type_main-medium">Восстановление пароля</span>
      <EmailInput
        extraClass="mt-6"
        name="email"
        onChange={handleOnChange}
        placeholder="Укажите e-mail"
        value={formData.email ?? ""}
      />
      <Button
        extraClass="mt-6"
        htmlType="submit"
        size={"medium"}
        type="primary"
      >
        Восстановить
      </Button>
      <span className="text text_type_main-small mt-20">
        Вспомнили пароль?
        <Link className={styles.link} to={'/login'}> Войти</Link>
      </span>
    </form>
  );
}
