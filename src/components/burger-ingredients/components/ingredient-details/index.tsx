import React from 'react';

import { IngredientDetailsCard } from '../ingredient-details-card';
import { Modal } from '../../../modal';

export function IngredientDetails() {

  return (
    <Modal title="Детали ингредиента">
      <IngredientDetailsCard />
    </Modal>
  );
}
