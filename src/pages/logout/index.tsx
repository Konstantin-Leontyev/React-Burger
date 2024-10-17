import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../pages.module.css';

import { logout } from '../../components/services/auth/actions';

export function Logout ({ title }: { title: string }): React.JSX.Element {
  const dispatch= useDispatch();

  useEffect(() => {
    // TODO remove ts-ignore
    // @ts-ignore
    dispatch(logout());
    // eslint-disable-next-line
  }, [])

  return <span className={`${styles.container} text text_type_main-large`}>{title}</span>
}
