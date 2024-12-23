import React from 'react';
import { useSelector } from "react-redux";
import styles from './ingredients-tab.module.css';

import { TCategories } from "../../burger-ingredients";
import { currentTab } from '../../../services/burger-ingredients/slice';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export function IngredientsTab({ categories }: { categories: TCategories }): React.JSX.Element {
  const current = useSelector(currentTab);

  function onClickHandler(): void {
    return;
  }

  return (
    <div className={`${styles.container} pb-10`}>
      {categories.map(category =>
        <Tab
          value={category.title}
          active={current === category.title}
          key={category.type}
          onClick={onClickHandler}
        >
          {category.title}
        </Tab>
      )}
    </div>
  );
}
