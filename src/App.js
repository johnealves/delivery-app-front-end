import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MainHeader from './Components/MainHeader';
import OrdersCustomer from './Pages/OrdersCustomer';
import DetailsCustomer from './Pages/DetailsCustomer';
import Checkout from './Pages/Checkout';
import NotFound from './Components/NotFound';
import './App.css';

function App() {
  return (
    <div>
      <MainHeader />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/login" component={ Login } />
        {/* <Route path="/register" component={ Login } /> */}
        <Route path="/customer/order/:id" component={ DetailsCustomer } />
        <Route path="/checkout" component={ Checkout } />
        <Route parh="/customer/orders" component={ OrdersCustomer } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
