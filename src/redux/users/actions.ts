import { IsSignedIn, Uid, UserName, Email, Cart, Orders } from "redux/store/initialState"

export type User = {
    uid: Uid
    username: UserName
    isSignedIn: IsSignedIn
    email: Email
}

export const SET_USER_ACTION = 'SET_USER_ACTION';

export const setUserAction = (user: User):Readonly<{
    type: typeof SET_USER_ACTION
    payload: User
}> => {
    return {
        type: SET_USER_ACTION,
        payload: user,
    }
}

export const FETCH_PRODUCTS_IN_CART_ACTION = 'FETCH_PRODUCTS_IN_CART_ACTION';

export const fetchProductsInCartAction = (cart: Cart):Readonly<{
    type: typeof FETCH_PRODUCTS_IN_CART_ACTION
    payload: Cart
}> => {
    return {
        type: FETCH_PRODUCTS_IN_CART_ACTION,
        payload: cart,
    }
}

export const ADD_TO_CART_ACTION = 'ADD_TO_CART_ACTION';
export const addToCartAction = (cart: Cart):Readonly<{
    type: typeof ADD_TO_CART_ACTION
    payload: Cart
}>  => {
    return {
        type: ADD_TO_CART_ACTION,
        payload: cart,
    }
}
export const REMOVE_FROM_CART_ACTION = 'REMOVE_FROM_CART_ACTION';
export const removeFromCartAction = (cart: Cart):Readonly<{
    type: typeof REMOVE_FROM_CART_ACTION
    payload: Cart
}> => {
    return {
        type: REMOVE_FROM_CART_ACTION,
        payload: cart,
    }
}

export const FETCH_ORDER_HISTORY_ACTION = 'FETCH_ORDER_HISTORY_ACTION';
export const fetchOrderHistoryAction = (orders: Orders):Readonly<{
    type: typeof FETCH_ORDER_HISTORY_ACTION
    payload: Orders
}>  => {
    return {
        type: FETCH_ORDER_HISTORY_ACTION,
        payload: orders,
    }
}

export const LOGOUT_USER_ACTION = 'LOGOUT_USER_ACTION';

export const logOutUserAction = ():Readonly<{
    type: typeof LOGOUT_USER_ACTION
}>  => {
    return {
        type: LOGOUT_USER_ACTION,
    }
}

