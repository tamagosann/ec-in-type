import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from '../../redux/store/store';
import CartTable from '../../components/Cart/CartTable'


test('cartList test', () => {
  const store = createStore();
  const component = render(
    <Provider store={store}>
        <BrowserRouter>
            <CartTable />
        </BrowserRouter>
    </Provider>,
    );
});