import { ProductsList, Toppings } from "redux/store/initialState";

export type ProductsAction<T> = (products: T) => {
    type: string;
    payload: T;
}

export const FETCH_PRODUCTS_ACTION = 'FETCH_PRODUCTS_ACTION';

export const fetchProductsAction: ProductsAction<ProductsList> = (products) => {
    // console.log(products)
    return {
        type: FETCH_PRODUCTS_ACTION,
        payload: products,
    }
}

export const FETCH_TOPPINGS_ACTION = 'FETCH_TOPPINGS_ACTION';

export const fetchToppingsAction: ProductsAction<Toppings> = (toppings) => {
    // console.log(toppings)
    return {
        type: FETCH_TOPPINGS_ACTION,
        payload: toppings,

    }
}

