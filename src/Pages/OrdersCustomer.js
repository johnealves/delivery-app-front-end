import React, { useEffect, useState } from 'react';
import CardOrderListCustomer from '../Components/CardOrderListCustomer';
import api from '../services/axiosApi';
import '../CSS/OrdersCustomer.css';
import { connect } from 'react-redux';
import md5 from 'md5';

const OrdersCustomer = ({ tokenRedux }) => {
  const [orders, setOrders] = useState([]);
  const token = tokenRedux;

  useEffect(() => {
    api.get('/orders', { headers: { authorization: token } })
      .then((resp) => setOrders(resp.data));
  }, [token]);

  return (
    <div className="order-list-container">
      { (orders.length) 
        ? orders.map(
          (order, index) => <CardOrderListCustomer order={ order } key={ index } />,
        ) 
        : <p>Ainda não ha pedidos realizados</p>}
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  tokenRedux: userReducer.token,
})

export default connect(mapStateToProps)(OrdersCustomer);
