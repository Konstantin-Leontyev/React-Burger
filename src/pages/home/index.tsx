import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector} from 'react-redux';

import { BurgerConstructor } from '../../components/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { ModalPreloader } from '../../components/modal';
import { TIngredient } from "../../components/utils/types";
import {
  hasIngredientsListRequestError, ingredientsList,
  isIngredientsListLoading
} from '../../components/services/burger-ingredients/reducers';

export function Home(): React.JSX.Element {
  const isLoading = useSelector(isIngredientsListLoading);
  const hasError = useSelector(hasIngredientsListRequestError);
  // TODO type useSelector
  const ingredients: TIngredient[] = useSelector(ingredientsList);

  return (
    <>
      {isLoading && <ModalPreloader title={'Загрузка ингредиентов ...'} />}
      {hasError && 'Произошла ошибка'}
      {
        !isLoading &&
        !hasError &&
        ingredients.length > 0 &&
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      }
    </>
  );
}
