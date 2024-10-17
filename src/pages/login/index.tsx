import React, {FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../pages.module.css';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { TLoginData } from "../../components/utils/types";
import { login } from '../../components/services/auth/actions';
import { useForm } from '../../components/utils/useForm';

export function Login(): React.JSX.Element {
  const dispatch = useDispatch();
  const { formData, handleOnChange } = useForm<TLoginData>({} as TLoginData);

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // TODO remove ts-ignore
    // @ts-ignore
    dispatch(login(formData));
  }

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <span className="text text_type_main-medium">Вход</span>
      <EmailInput
        extraClass="mt-6"
        name="email"
        onChange={handleOnChange}
        placeholder="E-mail"
        value={formData.email ?? ""}
      />
      <PasswordInput
        extraClass="mt-6"
        name="password"
        onChange={handleOnChange}
        value={formData.password ?? ""}
      />
      <Button
        extraClass="mt-6"
        htmlType="submit"
        size={"medium"}
        type="primary"
      >
        Войти
      </Button>
      <span className="text text_type_main-small mt-20">
        Вы - новый пользователь?
        <Link className={styles.link} to={'/register'}> Зарегистрироваться</Link>
      </span>
      <span className="text text_type_main-small mt-4">
        Забыли пароль?
        <Link className={styles.link} to={'/forgot-password'}> Восстановить пароль</Link>
      </span>
    </form>
  );
}
