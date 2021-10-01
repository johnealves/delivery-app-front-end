import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import io from '../socket';
import '../CSS/CardOrderList.css';

const CardOrderList = ({ order, role }) => {
  const [orderStatus, setOrderStatus] = useState(order.status);

  useEffect(() => {
    io.on('updateStatus', ({ status, id }) => {
      if (id === order.id) setOrderStatus(status);
    });
  });

  const renderDateAndPrice = () => (
    <div className="render-date-price">
      <p>
        { moment(order.sale_date).format('L')}
      </p>
      <p data-testid={ `seller_orders__element-card-price-${order.id}` }>
        { `R$ ${order.totalPrice}` }
      </p>
    </div>
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Link to={ `order/${order.id}` }>
      <div className="card-order">
        <p
          data-testid={ `seller_orders__element-order-id-${order.id}` }
          className="number-order"
        >
          Pedido
          <br />
          { order.id }
        </p>
        <div className="card-order-info">
          <section>
            <div className={ `status-container ${orderStatus}` }>
              { orderStatus.toUpperCase() }
            </div>
            { renderDateAndPrice() }
          </section>
          {(role === "seller") && <section className="card-order-address">
            <span>
              { order.deliveryAddress }
            </span>
            <span>,&nbsp; </span>
            <span>
              { order.deliveryNumber }
            </span>
          </section>}
        </div>
      </div>
    </Link>
  );
};

CardOrderList.propTypes = {
  order: shape().isRequired,
};

export default CardOrderList;
