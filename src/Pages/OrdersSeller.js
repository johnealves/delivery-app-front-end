import React, { useEffect, useState } from 'react';
import CardOrderList from '../Components/CardOrderListSeller';
import api from '../services/axiosApi';
import './OrdersSeller.css';

const OrdersSeller = () => {
  const [orders, setOrders] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log('Eu te odeio ESLINT');
    console.log(token);
    api.get('/orders', { headers: { authorization: token } })
      .then((resp) => setOrders(resp.data));
  }, [token]);

  return (
    <div>
      <div className="order-list-container">
        <section className="order-container">
          { orders
            .map((order, index) => <CardOrderList order={ order } key={ index } />) }
        </section>
      </div>
    </div>
  );
};

export default OrdersSeller;
