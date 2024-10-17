import React from 'react';
import styles from '../pages.module.css';

export function NotFound({ title }: { title: string } ) {

  return <span className={`${styles.container} text text_type_main-large`}>{title}</span>
}
