import React, {FormEvent, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../pages.module.css';

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { TPasswordResetData } from "../../components/utils/types";
import { resetPassword } from '../../components/utils/api';
import { useForm } from '../../components/utils/useForm';

export function ResetPassword(): React.JSX.Element {
  const navigate = useNavigate();
  const { formData, handleOnChange } = useForm<TPasswordResetData>({} as TPasswordResetData);

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    resetPassword(formData)
      .then((response) => {
        if (response.success) {
          localStorage.removeItem('forgot-password');
          navigate('/');
        }
    })
  }

  useEffect(() => {
    if (!localStorage.getItem('forgot-password')) {
      navigate('/forgot-password');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <span className="text text_type_main-medium">Восстановление пароля</span>
      <PasswordInput
        extraClass="mt-6"
        name="password"
        onChange={handleOnChange}
        placeholder="Введите новый пароль"
        value={formData.password ?? ""}
      />
      <Input
        extraClass="mt-6"
        name="token"
        onChange={handleOnChange}
        placeholder="Введите код из письма"
        type="text"
        value={formData.token ?? ""}
      />
      <Button
        extraClass="mt-6"
        htmlType="submit"
        size={"medium"}
        type="primary"
      >
        Сохранить
      </Button>
      <span className="text text_type_main-small mt-20">
        Вспомнили пароль?
        <Link className={styles.link} to={'/login'}> Войти</Link>
      </span>
    </form>
  );
}
