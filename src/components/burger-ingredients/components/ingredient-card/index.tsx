import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import styles from './ingredients-card.module.css';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../../utils/types";

export function IngredientCard({ ingredient }: { ingredient: TIngredient }) {
  const location = useLocation();

  const [, dragRef] = useDrag<TIngredient, unknown, unknown>({
        type: 'ingredient',
        item: ingredient,
  });

  return(
    <li className={`${styles.li}`} ref={dragRef}>
      <Link
        className={styles.link}
        to={`/ingredients/${ingredient._id}`}
        state={{ backgroundLocation : location }}
        >
        <div className={`${styles.container} pl-4 pr-4`}>
          <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
          {
            ingredient.__v > 0 &&
            <Counter count={ingredient.__v} size="default" extraClass="m-1" />
          }
          <div className={`${styles.price} pt-1 pb-1`}>
            <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
            <CurrencyIcon type="primary"/>
          </div>
          <div className={styles.title}>
            <span className="text text_type_main-small">{ingredient.name}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
