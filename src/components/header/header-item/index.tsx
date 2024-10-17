import React from 'react';
import styles from '../header/header.module.css';

import {THeaderItem} from "../../utils/constants";

type THeaderItemProps = {
  item: THeaderItem;
  isActive: boolean;
};

export function HeaderItem({ item, isActive}: THeaderItemProps) {
  const {Icon, name, title} = item;

  return (
    <li
      id={name}
      className={`${styles.li} pr-5 pl-5`}
    >
      <Icon type={isActive ? "primary" : "secondary"}/>
      <span className={`text text_type_main-default ml-2 ${!isActive ? "text_color_inactive" : null}`}>
        {title}
      </span>
    </li>
  );
}
