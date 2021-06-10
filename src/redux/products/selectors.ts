import { InitialState } from 'redux/store/initialState'
import { createSelector } from 'reselect'

const productSelector = (state: InitialState) => state.products

export const getProducts = createSelector(
  [productSelector],
  (state) => state.productsList,
)

export const getToppings = createSelector(
  [productSelector],
  (state) => state.toppings,
)
