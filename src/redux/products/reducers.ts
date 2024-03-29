import * as Actions from './actions'
import initialState from '../store/initialState'

export const ProductsReducer = (
  state = initialState.products,
  action:
    | ReturnType<typeof Actions.fetchProductsAction>
    | ReturnType<typeof Actions.fetchToppingsAction>,
) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS_ACTION:
      return {
        ...state,
        productsList: [...action.payload],
      }
    case Actions.FETCH_TOPPINGS_ACTION:
      return {
        ...state,
        toppings: [...action.payload],
      }
    default:
      return state
  }
}
