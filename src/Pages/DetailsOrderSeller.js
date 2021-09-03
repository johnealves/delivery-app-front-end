import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types';
import moment from 'moment';
import io from '../socket';
import api from '../../service/axiosApi';
import NotFound from '../../components/NotFound';
import ProductCardlist from '../../components/ProductCardList';
import './DetailsOrderSeller.css';
import NavBarSeller from '../../components/NavbarSeller';

const DetailsOrderSeller = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState('');

  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api
      .get(`/order/${id}`, { headers: { authorization: token } })
      .then((result) => {
        setOrder(result.data[0]);
        setOrderStatus(result.data[0].status);
      })
      .catch((err) => console.log(err));
  }, [id, token]);

  const handleStatus = ({ target: { name } }) => {
    io.emit('updateOrders', { id: order.id, status: name });
  };

  useEffect(() => {
    io.on('updateStatus', ({ status, id: idStatus }) => {
      if (idStatus === order.id) setOrderStatus(status);
    });
  });

  const dataTestButtonPrepare = 'seller_order_details__button-preparing-check';
  const dataTestButtonSend = 'seller_order_details__button-dispatch-check';
  const dTidStatus = 'seller_order_details__element-order-details-label-delivery-status';

  if (orderStatus === '') return <NotFound />;

  const renderInfoPedidos = () => (
    <div className="render-info-pedidos">
      <span>
        PEDIDO:
        {order.id}
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { moment(order.sale_date).format('L')}
      </span>
      <span
        data-testid={ dTidStatus }
        className={ `status-details ${orderStatus}` }
      >
        {orderStatus.toUpperCase()}
      </span>
    </div>
  );

  const renderButtosStatus = () => (
    <div>
      <button
        data-testid={ dataTestButtonPrepare }
        name="Preparando"
        type="submit"
        onClick={ handleStatus }
      >
        PREPARAR PEDIDO
      </button>
      <button
        data-testid={ dataTestButtonSend }
        name="Em Trânsito"
        type="submit"
        onClick={ handleStatus }
      >
        SAIU PARA ENTREGA
      </button>
    </div>
  );

  return (
    <div>
      <NavBarSeller />
      <div className="details-order-seller-container">
        <h3>Detralhe do Pedido</h3>
        <div className="details-order-container">
          <section>
            { renderInfoPedidos() }
            { renderButtosStatus() }
          </section>
          <li className="list-item-header">
            <span>
              item
            </span>
            <span>
              Descrição
            </span>
            <span>
              Quantidade
            </span>
            <span>
              Valor Unitário
            </span>
            <span>
              Sub-total
            </span>
          </li>
          <ul>
            { (order) && order.product
              .map((prod, i) => (
                <ProductCardlist product={ prod } key={ i } index={ i + 1 } />
              )) }
          </ul>
          <p data-testid="seller_order_details__element-order-total-price">
            Total: &nbsp;
            { `R$ ${order.totalPrice}` }
          </p>
        </div>
      </div>
    </div>
  );
};

DetailsOrderSeller.propTypes = {
  match: shape().isRequired,
};

export default DetailsOrderSeller;
