import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients as ingredientsRequest } from '../../utils/api';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await ingredientsRequest()
);
