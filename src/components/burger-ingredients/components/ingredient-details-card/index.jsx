import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

import {
  hasIngredientsListRequestError,
  ingredientsList,
  isIngredientsListLoading
} from '../../../services/burger-ingredients/reducers';
import {ModalPreloader} from "../../../modal";


export function IngredientDetailsCard() {
  const { id } = useParams();
  const isLoading = useSelector(isIngredientsListLoading);
  const hasError = useSelector(hasIngredientsListRequestError);
  const ingredients = useSelector(ingredientsList);
  const ingredient = ingredients.find(ingredient => ingredient._id === id);

  return (
    <>
      {isLoading && <ModalPreloader title={'Загрузка ингредиентов ...'} />}
      {hasError && 'Произошла ошибка'}
      {
        !isLoading &&
        !hasError &&
        ingredients.length > 0 &&
        <div className={styles.wrapper}>
      <img
        className={styles.img}
        src={ingredient.image_large}
        alt={ingredient.name}/>
      <span className={`${styles.span} text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</span>
      <ul className={`${styles.ul} pb-15`}>
        <li className={styles.li}>
          <span className="text text_type_main-sml text_color_inactive">Калории, ккал</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
        </li>
        <li className={styles.li}>
          <span className="text text_type_main-small text_color_inactive">Белки, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
        </li>
        <li className={styles.li}>
          <span className="text text_type_main-small text_color_inactive">Жиры, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
        </li>
        <li className={styles.li}>
          <span className="text text_type_main-small text_color_inactive">Углеводы, г</span>
          <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
      }
    </>
  );
}
