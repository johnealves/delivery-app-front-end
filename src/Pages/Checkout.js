import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ItemProductCheckout from '../Components/ItemProductCheckout';
import { setTotalCart } from '../Redux/Actions';
import calcTotalCart from '../util/totalPurchase';
import  '../CSS/checkout.css';
import api from '../services/axiosApi';
import { useHistory } from 'react-router';
import getUserData from '../services/getUserData';
// import CardAddressToDelivery from '../Components/CardAddressToDelivery';

const Checkout = ({ itens, totalCart, setPrice, tokenRedux }) => {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState({})
  // const [selectedAddress, setSelectedAddress] = useState({})
  const [addressToDelivery, setAddressToDelivery] = useState({
    deliveryAddress: null,
    deliveryNumber: null,
    deliveryDistrict: null,
    deliveryCity: null,
  })
  const history = useHistory()
  const token = tokenRedux;

  useEffect(() => { 
    const itensFormated = itens.filter((item) => item.quantity > 0)
    setCart(itensFormated);
    setPrice(calcTotalCart(itens));
    // loadUserData()
  }, [setPrice, setCart, itens])
  
  // const loadUserData = async () => {
  //   const token = localStorage.getItem("be6ab0c5114eebbcdeefb28cd016a5af")
  //   const user = await getUserData(token);
  //   setUser(user)
  //   // setSelectedAddress(user.address[0])
  // }

  const handleAddress = ({ target: { name, value } }) => {
    setAddressToDelivery({
      ...addressToDelivery,
      [`${name}`]: value,
    })
  }
  
  const submitOrder = async () => {
    const products = JSON.parse(localStorage.getItem("b8398c04b1b936e0bde5361cd3cc3cb0"))
    const { deliveryAddress, deliveryNumber } = addressToDelivery;
    if (deliveryAddress === null || deliveryNumber === null) {
      alert("Endereço incompleto! verifique o endereço e tente novamente")
      return null;
    }
    api.post("/sales", {
      name: "Fulana Pereira",
      totalPrice: totalCart,
      deliveryNumber: deliveryNumber,
      deliveryAddress: deliveryAddress,
      products
    },
    { headers: { authorization: token } })
    .then(({ data }) => {
      history.push(`/order/${data.id}`)
    })
    .catch((err) => console.log(err))
  }

  const renderFormToDeliveryAddress = () => {
    return (<div>
      <form className="form-address-to-delivery-container">
        <h6>Endereço para entrega:</h6>
        <div className="mb-1">
          <label htmlFor="input-address" className="form-label">
            Endereço:
            <input id="input-address" className="form-control" name="deliveryAddress" onInput={ handleAddress } type="text" placeholder="Rua..." required />
          </label>
        </div>
        <div className="mb-1">
          <label htmlFor="input-number" className="form-label">
            numero:
            <input id="input-number" className="form-control" name="deliveryNumber" onInput={ handleAddress } type="text" placeholder="" required />
          </label>
        </div>
        <div className="mb-1">
          <label htmlFor="input-district" className="form-label">
            Bairro:
            <input id="input-district" className="form-control" name="deliveryDistrict" onInput={ handleAddress } type="text" placeholder="" required />
          </label>
        </div>
        <div className="mb-1">
          <label htmlFor="input-city" className="form-label">
            Cidade:
            <input id="input-city" className="form-control" name="deliveryCity" onInput={ handleAddress } type="text" placeholder="" required />
          </label>
        </div>
      </form>
    </div>)
  }

  return (
    <div className="checkout-container">
      {/* <CardAddressToDelivery address={ selectedAddress } /> */}
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
      <button className="btn btn-outline-danger" >Esvaziar carrinho</button>
      { renderFormToDeliveryAddress() }
      <footer>
        <div>
          <p>Total</p>
          <p>
            { (totalCart) ? totalCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
             : "R$ 0.00" }
          </p>
        </div>
        <button className="btn btn-danger" onClick={ submitOrder }>
          Concluir compra
        </button>
      </footer>
    </div>
  )
}

const mapStateToProps = ({ cartReducer, userReducer }) => ({
  itens: cartReducer.itens,
  totalCart: cartReducer.totalCart,
  tokenRedux: userReducer.token,
})

const mapDispatchToProps = (dispatch) => ({
  setPrice: (total) => dispatch(setTotalCart(total))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

