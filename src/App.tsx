import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, InitialState } from "redux/store/initialState";
import { Header } from "./components/Header";
import { db } from "./firebase";
import {
  fetchProductsInCart,
  listenAuthState,
  updateProductsInCart,
} from "./redux/users/operations";
import { getIsSignedIn, getProductsInCart, getUid } from "./redux/users/selectors";
import Router from "./Router";

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state: InitialState) => state);
  const isSignedIn = getIsSignedIn(selector);
  const uid = getUid(selector);
  let productsInCart = getProductsInCart(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    } else {
      dispatch(fetchProductsInCart());

      const unsubscribe = db
        .collection('users')
        .doc(uid)
        .collection('cart')
        .onSnapshot((snapshots) => {
          snapshots.docChanges().forEach((change) => {
            const product: CartItem = change.doc.data() as CartItem
            const changeType = change.type;

            switch (changeType) {
              case "added":
                productsInCart.push(product);
                break;
              case "modified":
                const index = productsInCart.findIndex((product) => {
                  return product.productId === (change.doc.id as string);
                });
                productsInCart[index] = product;
                break;
              case "removed":
                productsInCart = productsInCart.filter((product) => {
                  return product.cartId !== (change.doc.id as string)
                });
                break;
              default:
                break;
            }
          });
          dispatch(updateProductsInCart(productsInCart));
        });

        return () => unsubscribe();
    }
  }, [isSignedIn]);

  return (
    <>
      <Header cartLength={productsInCart ? productsInCart.length : 0} />
      <div className="header-space"></div>
      <Router />
    </>
  );
}

export default App;

