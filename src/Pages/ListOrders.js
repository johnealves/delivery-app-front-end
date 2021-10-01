import React, { useEffect, useState } from 'react';
import api from '../services/axiosApi';
import { connect } from 'react-redux';
import CardOrderList from '../Components/CardOrderList';
import getUserData from '../services/getUserData';
import '../CSS/Orders.css';

const ListOrders = ({ tokenRedux }) => {
  console.log("seller custome")
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState("customer")
  const token = tokenRedux;

  useEffect(() => {
    getUserData(token).then(resp => setRole(resp.role));
    api.get('/orders', { headers: { authorization: token } })
      .then((resp) =>  {
        setOrders(resp.data)
      });
  }, [token]);

  return (
    <div className="order-list-container">
      { (orders.length) 
        ? orders.map(
          (order, index) => <CardOrderList role={ role } order={ order } key={ index } />,
        ) 
        : <p>Ainda não ha pedidos realizados</p>}
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  tokenRedux: userReducer.token,
})

export default connect(mapStateToProps)(ListOrders);