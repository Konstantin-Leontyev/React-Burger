import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import styles from './filled-element.module.css'

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteCurrentBurgerIngredient, moveIngredients} from '../../../services/burger-constructor/reducers';
import { ingredientPropTypes } from '../../../utils/constants';
import { resetIngredientCount } from '../../../services/burger-ingredients/reducers';

FilledElement.propTypes = {
  type: PropTypes.string,
  index: PropTypes.number,
  ingredient: ingredientPropTypes.isRequired,
};

export function FilledElement({ ingredient, index, type}) {
  const dispatch = useDispatch();
  const ref = useRef();

  const { price, name, image, key } = ingredient;

  let icon = null;
  let comment = '';

  if(type === 'top') {
    comment = '(верх)';
  } else if (type === 'bottom') {
    comment = '(низ)';
  } else {
    icon = <DragIcon type="primary"/>;
  }

  const  onHandleClose = useCallback(() => {
    dispatch(deleteCurrentBurgerIngredient(key));
    dispatch(resetIngredientCount(ingredient));
    // eslint-disable-next-line
  }, [ingredient]);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'card',
    item: () => {
      return {key, index};
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const opacity = isDragging ? 0 : 1;

  const [, dropRef] = useDrop({
    accept: 'card',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredients({dragIndex, hoverIndex}));

      item.index = hoverIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <div className={styles.container} ref={ref} style={{ opacity }}>
      {icon}
      <div className={styles.element}>
        <ConstructorElement
          type={type}
          text={`${name} ${comment}`}
          price={price}
          isLocked={!!type}
          thumbnail={image}
          extraClass="ml-2"
          handleClose={onHandleClose}
        />
      </div>
    </div>
  );
}
