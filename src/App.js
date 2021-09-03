import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MainHeader from './Components/MainHeader';
import OrdersCustomer from './Pages/OrdersCustomer';
import DetailsCustomer from './Pages/DetailsCustomer';
import './App.css';

function App() {
  return (
    <div>
      <MainHeader />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/login" component={ Login } />
        <Route path="/customer/order/:id" component={ DetailsCustomer } />
        <Route parh="/orders/" component={ OrdersCustomer } />
      </Switch>
    </div>
  );
}

export default App;
