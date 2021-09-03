import React, { useEffect, useState } from 'react';
import CardOrderListCustomer from '../Components/CardOrderListCustomer';
import api from '../services/axiosApi';
import '../CSS/OrdersCustomer.css';

const OrdersCustomer = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('be6ab0c5114eebbcdeefb28cd016a5af');

  useEffect(() => {
    api.get('/orders', { headers: { authorization: token } })
      .then((resp) => setOrders(resp.data));
  }, [token]);

  return (
    <div className="order-list-container">
      { orders
        .map(
          (order, index) => <CardOrderListCustomer order={ order } key={ index } />,
        ) }
    </div>
  );
};

export default OrdersCustomer;
