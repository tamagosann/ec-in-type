import { Dispatch } from 'react'
import { Action } from 'redux'
import {
  ProductsList,
  ProductsListItem,
  Toppings,
  Topping,
} from 'redux/store/initialState'
import { db } from '../../firebase'
import { fetchProductsAction, fetchToppingsAction } from './actions'

type ProductsOperation = () => (dispatch: Dispatch<Action>) => Promise<void>

export const fetchProducts: ProductsOperation = () => {
  return async (dispatch: Dispatch<Action>) => {
    let products: ProductsList = []
    await db
      .collection('products')
      .doc('FeKpGj7gUgt7dvFmbWIU')
      .collection('parentProducts')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          products.push({
            ...(doc.data() as ProductsListItem),
            productId: doc.id,
          })
        })
      })
    // console.log(products)
    dispatch(fetchProductsAction(products))
  }
}

export const fetchToppings: ProductsOperation = () => {
  return async (dispatch: Dispatch<Action>) => {
    let toppings: Toppings = []
    await db
      .collection('products')
      .doc('FeKpGj7gUgt7dvFmbWIU')
      .collection('toppings')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => toppings.push(doc.data() as Topping))
      })
    toppings.sort((x, y) => x.toppingName.localeCompare(y.toppingName, 'ja'))
    dispatch(fetchToppingsAction(toppings))
  }
}
