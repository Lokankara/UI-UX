import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './product.actions';

export const initialState = {
  products: [],
  error: '',
  loading: false,
};

const _productReducer = createReducer(
  initialState,
  on(loadProducts, state => ({ ...state, loading: true })), // Sets loading to true when products are being fetched
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })), // Updates the state with the loaded products
  on(loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })) // Updates the state with an error message
);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}
