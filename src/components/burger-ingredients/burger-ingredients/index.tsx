import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';

import { IngredientCard } from '../components/ingredient-card';
import { IngredientsTab } from '../components/ingredients-tab';
import { ingredientsList, setTab } from '../../services/burger-ingredients/reducers';
import { TIngredient } from "../../utils/types";

export type TCategories = {
  title: string;
  type: string;
  ref: React.MutableRefObject<HTMLDivElement>
}[];

export function BurgerIngredients(): React.JSX.Element {
  const dispatch = useDispatch();
  // TODO type useSelector
  const ingredients: TIngredient[] = useSelector(ingredientsList);

  const bunRef = useRef({} as HTMLDivElement);
  const innerRef = useRef({} as HTMLDivElement);
  const sauceRef = useRef({} as HTMLDivElement);

  const categories: TCategories = [
    { title: "Булки", type: "bun", ref: bunRef},
    { title: "Соусы", type: "sauce", ref: sauceRef},
    { title: "Начинки", type: "main", ref: innerRef},
  ];

  function handleOnScroll(event: React.UIEvent): void {
    let cursor = event.currentTarget.getBoundingClientRect().top;
    let bunTop = Math.abs(cursor - bunRef.current.getBoundingClientRect().top);
    let sauceTop = Math.abs(cursor - sauceRef.current.getBoundingClientRect().top);
    let innerTop = Math.abs(cursor - innerRef.current.getBoundingClientRect().top);

    let closestTitle = Math.min(...[bunTop, sauceTop, innerTop]);

    if (closestTitle === bunTop) {
      dispatch(setTab('Булки'));
    } else if (closestTitle === sauceTop) {
      dispatch(setTab('Соусы'));
    } else if (closestTitle === innerTop) {
      dispatch(setTab('Начинки'));
    }
  }

  return (

    <section className={styles.container}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <IngredientsTab categories={categories} />
      <div className={`${styles.scroll} custom-scroll`} onScroll={handleOnScroll}>
        {categories.map(category =>
          <div className="pb-10" key={category.type} ref={category.ref} >
            <span className="text text_type_main-medium">{category.title}</span>
            <ul className={`${styles.wrapper} pl-4 pr-4`}>
              {ingredients.filter(ingredient => ingredient.type === category.type)
                .map(ingredient =>
                  <IngredientCard ingredient={ingredient} key={ingredient._id}/>
                )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
