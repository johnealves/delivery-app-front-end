import React, { useEffect, useState } from 'react';
import moment from 'moment';
import io from '../socket';
import api from '../services/axiosApi';
import NotFound from '../Components/NotFound';
import ProductCardlist from '../Components/ProductCardList';
import { connect } from 'react-redux';
import getUserData from '../services/getUserData';
import '../CSS/DetailsOrder.css';

const DetailsOrder = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState('');
  const [role, setRole] = useState("customer")
  // const [deliveryAddress] = useState()

  const token = props.tokenRedux;
  
  useEffect(() => {
    getUserData(token).then(resp => setRole(resp.role));
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

  const dataTestButtonSend = 'customer_order_details__button-delivery-check';
  // const dTidStat = 'customer_order_details__element-order-details-label-delivery-status';

  if (orderStatus === '') return <NotFound />;

  const renderInfoPedidos = () => (
    <div className="render-info-pedidos">
      <p>
        PEDIDO: &nbsp;
        {order.id}
      </p>
      {/* <p>
        Vend: &nbsp;
        { order.seller.name }
      </p> */}
      <p
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { moment(order.sale_date).format('DD/MM/yyyy')}
      </p>
    </div>
  );

  const renderAddressToDelivery = () => {
    return (
      <div>
        <h6>Endereço para entrega:</h6>
        <p>{ `${order.deliveryAddress}, nº${order.deliveryNumber}` } </p>
      </div>
    )
  }

  const renderButtonStatusClient = () => (
    <div className="render-button">
      <button
        data-testid={ dataTestButtonSend }
        name="entregue"
        type="submit"
        onClick={ handleStatus }
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );

  const renderButtonStatusSeller = () => (
    <div className="buttons-seller-container">
      <button
        name="Preparando"
        type="submit"
        onClick={ handleStatus }
      >
        PREPARAR PEDIDO
      </button>
      <button
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
      <div className="details-order-seller-container">
        <h3>Detralhes do Pedido</h3>
        <div className="status-details orders-steps" />
        <div className={ `status-details ${orderStatus}` }/>
        <p>
          {`Status do pedido: ${orderStatus}` }
        </p>
        <div className="details-order-container">
          <section>
            { renderInfoPedidos() }
          </section>
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
        { (role === "seller") && renderAddressToDelivery()}
        { (role === "customer")
          ? renderButtonStatusClient()
          : renderButtonStatusSeller() }
      </div>
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  tokenRedux: userReducer.token,
})

export default connect(mapStateToProps)(DetailsOrder);