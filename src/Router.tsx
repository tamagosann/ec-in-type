import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import { OrderConfirm, OrderHistory, ProductDetail, ProductList } from "./templates";
import {CartTable} from './components/Cart/index'
import OrderComplete from "./templates/OrderComplete";
import ProductEdit from './templates/ProductEdit'

const Router = () => {
  return (
    <Switch>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route exact path={"/product/:productId"} component={ProductDetail} />
        <Route exact path={"/cart"} component={CartTable} />
      <Auth>
        <Route exact path={"/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/order/complete"} component={OrderComplete} />
        <Route exact path={"/order/history"} component={OrderHistory} />
        <Route exact path={"/edit"} component={ProductEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
