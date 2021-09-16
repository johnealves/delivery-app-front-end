import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ItemProductCheckout from '../Components/ItemProductCheckout';
import { setTotalCart } from '../Redux/Actions';
import calcTotalCart from '../util/totalPurchase';
import  '../CSS/checkout.css';

const Checkout = ({ itens, totalCart, setPrice }) => {
  const [cart, setCart] = useState([])

  useEffect(() => { 
    const itensFormated = itens.filter((item) => item.quantity > 0)
    setCart(itensFormated);
    setPrice(calcTotalCart(itens));
  }, [])

  return (
    <div className="checkout-container">
      <ul>
        <hr/>
        { (itens) && cart.map((product, i) => <ItemProductCheckout product={ product } key={ i } />) }
      </ul>
      <footer>
        <div>
          <p>Total</p>
          <p>
            { (totalCart) ? `R$ ${totalCart}` : "R$ 0.00" }
          </p>
        </div>
        <button className="btn btn-danger">
          Finalizar compra
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

