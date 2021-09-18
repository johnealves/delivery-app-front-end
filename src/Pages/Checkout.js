import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ItemProductCheckout from '../Components/ItemProductCheckout';
import { setTotalCart } from '../Redux/Actions';
import calcTotalCart from '../util/totalPurchase';
import  '../CSS/checkout.css';
import api from '../services/axiosApi';
import { useHistory } from 'react-router';

const Checkout = ({ itens, totalCart, setPrice }) => {
  const [cart, setCart] = useState([])
  const history = useHistory()

  useEffect(() => { 
    const itensFormated = itens.filter((item) => item.quantity > 0)
    setCart(itensFormated);
    setPrice(calcTotalCart(itens));
  }, [setPrice, setCart, itens])

  const submitOrder = () => {
    const token = localStorage.getItem("be6ab0c5114eebbcdeefb28cd016a5af")
    const products = JSON.parse(localStorage.getItem("b8398c04b1b936e0bde5361cd3cc3cb0"))
    api.post("/sales", {
      name: "Fulana Pereira",
      totalPrice: totalCart,
      deliveryNumber: "50",
      deliveryAddress: "Estrada dos Alfaneiros",
      products
    },
    { headers: { authorization: token } })
    .then(({ data }) => {
      history.push(`/customer/order/${data.id}`)
    })
    .catch((err) => console.log(err))
  }

  // sale example
  // {
  //   "name": "Fulana Pereira",
  //   "totalPrice": 100,
  //   "deliveryNumber": "50",
  //   "deliveryAddress": "Rua Borel",
  //   "products": [
  //     {
  //       "id": 1,
  //       "price": "2.20",
  //       "quantity": 10
  //     },
  //     {
  //       "id": 2,
  //       "price": "2.20",
  //       "quantity": 10
  //     }
  //   ]
  // }

  return (
    <div className="checkout-container">
      <h3>Pedido</h3>
      <ul>
        <hr/>
        { (itens) && cart.map((item, i) => {
          return (
            <>
              <ItemProductCheckout item={ item } key={ i } />
              <hr/>
            </>
          )
        }) }
      </ul>
      <footer>
        <div>
          <p>Total</p>
          <p>
            { (totalCart) ? `R$ ${totalCart}` : "R$ 0.00" }
          </p>
        </div>
        <button className="btn btn-danger" onClick={ submitOrder }>
          Concluir compra
        </button>
      </footer>
    </div>
  )
}

const mapStateToProps = ({ cartReducer }) => ({
  itens: cartReducer.itens,
  totalCart: cartReducer.totalCart,
})

const mapDispatchToProps = (dispatch) => ({
  setPrice: (total) => dispatch(setTotalCart(total))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

