import React from 'react';
import styles from './empty-element.module.css'

import { TIngredient } from "../../../utils/types";

type TEmptyElementProps = {
  type: string;
  item: TIngredient,
  isOver: boolean,
};

export function EmptyElement({ type, item, isOver }: TEmptyElementProps): React.JSX.Element {
  const mainType = type === 'main';

  const text = mainType
    ? 'Выберите и перетащите ингредиенты и соус.'
    : 'Выберете и перетащите булку.';

  const rotation = mainType
    ? styles.main
    : type === 'top'
      ? styles.top
      : styles.bottom;

  const isBunDragging = isOver && !mainType && item.type === 'bun';
  const isInnerDragging = isOver && mainType && item.type !== 'bun';

  const borderColor = isBunDragging ? '#008000' : isInnerDragging ? '#008000' : '#2F2F37';

  return (
    <div className={`${styles.container} ${rotation}`} style={{ borderColor }}>
      <span className="text text_type_main-default">
        {text}
      </span>
    </div>
  );
}
