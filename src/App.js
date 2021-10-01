import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MainHeader from './Components/MainHeader';
// import OrdersCustomer from './Pages/OrdersCustomer';
import DetailsCustomer from './Pages/DetailsOrder';
import Checkout from './Pages/Checkout';
import NotFound from './Components/NotFound';
import './App.css';
import Register from './Pages/Register';
import DetailsOrder from './Pages/DetailsOrder';
import ListOrders from './Pages/ListOrders';

function App() {
  return (
    <div>
      <MainHeader />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/orders" component={ ListOrders} />
        <Route path="/order/:id" component={ DetailsOrder } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
