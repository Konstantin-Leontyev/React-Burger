import PropTypes from 'prop-types';
import React from "react";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

export type THeaderItem = {
  title: string;
  name: string;
  route: string;
  type: string;
  Icon: ({type}: TIconProps) => React.JSX.Element
};

export const headerItemsInitialState: THeaderItem[] = [
  {
    title: 'Конструктор',
    name: 'BurgerIcon',
    route: '/',
    type: 'navItems',
    Icon: BurgerIcon,
  },
  {
    title: "Лента заказов",
    name: "ListIcon",
    route: '/feed',
    type: 'navItems',
    Icon: ListIcon,
  },
  {
    title: 'Личный кабинет',
    name: 'ProfileIcon',
    route: '/profile',
    type: 'authItems',
    Icon: ProfileIcon,
  },
];

export const baseUrl: string = 'https://norma.nomoreparties.space/api/';


export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const categoryPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
