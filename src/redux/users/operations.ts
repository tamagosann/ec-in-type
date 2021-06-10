import firebase from 'firebase/app'
import { History } from 'history';
import { Dispatch } from 'react';
import { Action } from 'redux';
import { Cart, CartItem, InitialState, Order, Orders, ProductsListItem } from 'redux/store/initialState';
import { auth, db, FirebaseTimestamp } from '../../firebase';
import { setUserAction, fetchProductsInCartAction, removeFromCartAction, fetchOrderHistoryAction, logOutUserAction } from './actions';
import { addToCartAction, User } from './actions';

export const signIn = () => {
    return async (dispatch: Dispatch<Action>) => {
        const google_auth_provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithRedirect(google_auth_provider);
    }
}

export const signOut = () => {
    return async (dispatch: Dispatch<Action>) => {
        auth.signOut();
        dispatch(logOutUserAction())
    }
}

export const listenAuthState = () => {
    return async (dispatch: Dispatch<Action>) => {
        return auth.onAuthStateChanged(user => {
            if(user) {
                // console.log(user)
                const uid = user.uid;
                const username = user.displayName;
                const email = user.email
                const loginUser: User = {
                    uid: uid,
                    isSignedIn: true,
                    username: username,
                    email: email,
                }
                // console.log(loginUser)
                dispatch(setUserAction(loginUser));
            } else {
                dispatch(logOutUserAction());
            }
        })
    }
}

export const fetchProductsInCart = () => {
    return async (dispatch: Dispatch<Action>, getState: () => InitialState) => {
        const uid = getState().users.uid;
        let fetchedCart: Cart = [];
        await db.collection(`users/${uid}/cart`).get()
            .then(snapshot => {
                // console.log(snapshot)
                snapshot.forEach(doc => {
                    // console.log(doc)
                    const data = doc.data() as CartItem;
                    const cartItem = {
                        ...data,
                        todoId: doc.id
                    };
                    fetchedCart.push(cartItem);
                });
            })
        // console.log(fetchedCart)
        dispatch(fetchProductsInCartAction(fetchedCart))
    }
}

export const updateProductsInCart = (products: Cart) => {
    return async (dispatch: Dispatch<Action>) => {
        //処理が全く同じなのでfetchProductsInCartActionを使い回す
        dispatch(fetchProductsInCartAction(products))
    }
}

export const addToCart = (selectedSize: string, selectedPrice: number, quantity: number, toppingId: string, toppingName: string, toppingPrice: number, history: History, chosen: ProductsListItem) => {
    return async (dispatch: Dispatch<Action>, getState: () => InitialState) => {
        const uid = getState().users.uid;
        const isSignedIn = getState().users.isSignedIn;
        let cart = getState().users.cart;

        if(isSignedIn) {
            const cartRef = await db.collection(`users/${uid}/cart`).doc();
            const newCartItem: CartItem = {
                cartId: cartRef.id,
                productId: chosen.productId,
                productName: chosen.productName,
                url: chosen.url,
                productSize: selectedSize,
                productPrice: selectedPrice,
                quantity,
                toppingId,
                toppingName,
                toppingPrice,
            }
            cartRef.set(newCartItem);
            history.push('/')
        } else {
            const newCartItem: CartItem = {
                cartId: '',
                productId: chosen.productId,
                productName: chosen.productName,
                url: chosen.url,
                productSize: selectedSize,
                productPrice: selectedPrice,
                quantity,
                toppingId,
                toppingName,
                toppingPrice,
            };
            cart.push(newCartItem);
            dispatch(addToCartAction(cart))
            history.push('/')
        }
    }
}

export const removeFromCart = (cartId: string, index: number) => {
    return async (dispatch: Dispatch<Action>, getState: () => InitialState) => {
        if(!window.confirm('本当にカートから消去しますか？')) {
            return false;
        }
        const isSignedIn = getState().users.isSignedIn;
        const uid = getState().users.uid;
        let cart = getState().users.cart;
        if(isSignedIn) {
            await db.collection(`users/${uid}/cart`).doc(cartId).delete()
        } else {
            cart.splice(index, 1);
            dispatch(removeFromCartAction(cart))
        }
    }
}

export const order = (cart: Cart, destinationName: string, destinationMail: string,
    destinationZipcode: string, destinationAddress: string, destinationTel: string,
    destinationDate: string, destinationTime: string, paymentMethod: string, creditCard: string, history: History) => {
        return async (getState: () => InitialState) => {
            const uid = getState().users.uid;
            const userRef = db.collection('users').doc(uid);
            const timestamp = FirebaseTimestamp.now();
            const email = getState().users.email;
            const windowEmail = (window as any).Email 
            // CDNで読み込んでいるため型を一時的にanyとする

            const dateToString = (date: Date): string => {
                return date.getFullYear() + '-'
                    + ('00' + (date.getMonth() + 1)).slice(-2) + '-'
                    + ('00' + date.getDate()).slice(-2)
            };

            const orderDate: string = dateToString(timestamp.toDate());
            const buyed: string[] = cart.map(item => 
                    `【${item.productName}(${item.productSize} × ${item.quantity}個）、
                    トッピング：${item.toppingName} 】` 
                    )
            const total = cart.map(item => (item.productPrice * item.quantity) + item.toppingPrice).reduce((a, b) => (a + b) , 0)
            
            if(window.confirm('本当にこの内容でよろしいですか？')){
            windowEmail.send({
                Host : "smtp.elasticemail.com",
                Username : "getstarted3601@gmail.com",
                Password : "FF64CD6628A5154D408D64CF0FD27880A64B",
                To : email,
                From : "getstarted3601@gmail.com",
                Subject : "購入完了のお知らせ",
                Body : `この度はご購入いただきありがとうございました。ご購入いただいた商品は${buyed}です（合計金額：${Math.floor(total * 1.1)}円）。またのご利用をお待ちしております！`
            }).then(alert('購入が完了しました。ご利用いただきありがとうございました！'))
            history.push('/order/complete')

            await cart.forEach(cartItem => {
                const cartItemMemo = userRef.collection('orders').doc();

                const amount: number = (cartItem.productPrice * cartItem.quantity + cartItem.toppingPrice);

                const orderedItem: Order = {
                    orderId: cartItemMemo.id,
                    status: Number(paymentMethod),
                    destinationName,
                    destinationMail,
                    destinationZipcode,
                    destinationAddress,
                    destinationTel,
                    orderDate: orderDate,
                    destinationDate,
                    destinationTime,
                    paymentMethod: Number(paymentMethod),
                    creditCardNo: creditCard,
                    productId: cartItem.productId,
                    productName: cartItem.productName,
                    url: cartItem.url,
                    productSize: cartItem.productSize,
                    quantity: cartItem.quantity,
                    toppingId: cartItem.toppingId,
                    toppingName: cartItem.toppingName,
                    amount: amount,
                };
                cartItemMemo.set(orderedItem)
                userRef.collection('cart').doc(cartItem.cartId).delete();
            });
        } else {
            alert('購入がキャンセルされました')
        }

    }
}

export const fetchOrderHistory = () => {
    return async (dispatch: Dispatch<Action>, getState: () => InitialState) => {
        const uid = getState().users.uid;
        const newOrderHistory: Orders = [];
        await db.collection('users').doc(uid).collection('orders').get()
            .then(snapshots => {
                snapshots.forEach(doc => {
                    newOrderHistory.push(doc.data() as Order);
                })
            });
        dispatch(fetchOrderHistoryAction(newOrderHistory))
    }
}

export const orderStatusChange = (orderId: string, newStatus: number) => {
    return async (dispatch: Dispatch<Action>, getState: () => InitialState) => {
        if(!window.confirm('本当に変更しますか？')) {
            return false
        }
        if(newStatus < 0) {
            return false;
        }
        const uid = getState().users.uid;
        let orderHistory = getState().users.orders;
        const index: number = orderHistory.findIndex(order => {
            return order.orderId === orderId
        });
        let cancelledOrder: Order = orderHistory[index]
        cancelledOrder.status = newStatus;

        db.collection('users').doc(uid).collection('orders').doc(orderId)
            .set(cancelledOrder).then(() => {
                orderHistory[index] = cancelledOrder;
                dispatch(fetchOrderHistoryAction(orderHistory));
            })

    }
} 

export const noLoginAddToCart = (noLoginCartItem: CartItem) => {
    return async (getState: () => InitialState) => {
        const uid = getState().users.uid;
        const cartRef = db.collection(`users/${uid}/cart`).doc();
        noLoginCartItem.cartId = cartRef.id;
        cartRef.set(noLoginCartItem);
    }
}