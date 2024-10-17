import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';

import { FilledElement } from '../components/filled-element';
import { EmptyElement } from '../components/empty-element';
import { Modal, ModalPreloader } from '../../modal';
import { OrderDetails } from '../components/order-details';
import { TotalPrice } from '../components/total-price';

import { TIngredient } from "../../utils/types";
import {
  addCurrentBurgerBun,
  addCurrentBurgerIngredient,
  currentBun, currentIngredients,
  isOrderDetailsLoading,
  hasOrderDetailsRequestError,
  resetOrderDetails,
  orderDetails,
} from '../../services/burger-constructor/reducers';
import { resetIngredientCount, setIngredientCount } from '../../services/burger-ingredients/reducers';

// TODO replace key
type TKeyIngredient = TIngredient & { key: string };

type TCollectedProps = {
  isOver: boolean;
  item: TIngredient;
};

export function BurgerConstructor(): React.JSX.Element {
  const dispatch = useDispatch();
  // TODO type useSelector
  const bun: TKeyIngredient  = useSelector(currentBun);
  const ingredients: TKeyIngredient[] = useSelector(currentIngredients);
  const [{ isOver, item }, dropTarget] = useDrop<TIngredient, unknown, TCollectedProps>({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(addCurrentBurgerBun(item));
      }
      else {
        dispatch(addCurrentBurgerIngredient(item));
      }
      dispatch(setIngredientCount(item));
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const isLoading = useSelector(isOrderDetailsLoading);
  const hasError = useSelector(hasOrderDetailsRequestError);
  const details = useSelector(orderDetails);

  const scroll = ingredients.length > 5 ? `${styles.scroll} custom-scroll` : 'mr-5';

  function onModalClose() {
    ingredients.map(ingredient => dispatch(resetIngredientCount(ingredient)));
    dispatch(resetIngredientCount(bun));
    // @ts-ignore
    dispatch(resetOrderDetails());
  }

  return (
    <section className={`${styles.container} pt-25`} ref={dropTarget}>
      <>
        <div className={styles.topBottomElement} >
          {
            bun
            ? <FilledElement type="top" ingredient={bun} />
            : <EmptyElement type="top" item={item} isOver={isOver} />
          }
        </div>
        <ul className={styles.ul} >
          <div className={scroll}>
            {
              ingredients.length > 0
                ? ingredients.map((ingredient, index) =>
                  <li
                    className={`${styles.mainElement} ${index !== ingredients.length - 1 ? "pb-4" : null}`}
                    key={ingredient.key}
                  >
                    <FilledElement ingredient={ingredient} index={index}/>
                  </li>)
                : <li className={`${styles.mainElement}`}>
                    <EmptyElement type={"main"} item={item} isOver={isOver}/>
                  </li>
            }
          </div>
        </ul>
        <div className={styles.topBottomElement} >
          {
            bun
            ? <FilledElement type="bottom" ingredient={bun} />
            : <EmptyElement type={"bottom"} item={item} isOver={isOver} />
          }
        </div>
        {
          bun &&
          ingredients.length > 0 &&
          <TotalPrice bun={bun} ingredients={ingredients} />
        }
        {
          isLoading
          ? <ModalPreloader title={'Оформление заказа ...'} />
          : !hasError &&
            details &&
            <Modal onClose={onModalClose}>
              <OrderDetails />
            </Modal>
        }
      </>
    </section>
  );
}
