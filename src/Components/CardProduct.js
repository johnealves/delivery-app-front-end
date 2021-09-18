import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../CSS/cardProduct.css';
import { setTotalCart } from '../Redux/Actions';
import calcTotalCart from '../util/totalPurchase';

const CardProduct = ({ product, itens, setPrice }) => {
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(()=> {
    (itens) && itens.forEach((item) => (item.id === product.id) && setItemQuantity(item.quantity))
  }, [itens, product.id])

  const increaseCart = () => {
    setItemQuantity(itemQuantity + 1)
    if (itens.find((item) => item.id === product.id)) {
      itens.forEach((item) => {
        if (item.id === product.id) {
          item.quantity += 1;
        }
      })
    } else {
      itens.push({
        id: product.id,
        price: product.price,
        quantity: itemQuantity + 1
      })
    }
    const itensFormated = itens.filter((item) => item.quantity > 0)
    setPrice(calcTotalCart(itensFormated))
    localStorage.setItem("b8398c04b1b936e0bde5361cd3cc3cb0", JSON.stringify(itensFormated))
  }

  const decreaseCart = () => {
    if (itemQuantity < 1) return null
    setItemQuantity(itemQuantity - 1)
    if (itens.find((item) => item.id === product.id)) {
      itens.forEach((item) => {
        if (item.id === product.id) {
          item.quantity -= 1;
        }
      })
    }
    const itensFormated = itens.filter((item) => item.quantity > 0)
    const totalCart = calcTotalCart(itensFormated);
    setPrice(totalCart)
    localStorage.setItem("b8398c04b1b936e0bde5361cd3cc3cb0", JSON.stringify(itensFormated))
  }

  return (
    <li className="card-product-container">
      <div>
        <h5>{product.name}</h5>
        <p max-length="150">{product.description}</p>
        <p className="price-element">{`R$ ${product.price}`}</p>
      </div>
      <div>
        <img src={product.urlImage} alt={`${product.name} foto`} />
        <section className='quantity-item-container'>
          <button
            onClick={decreaseCart}
          >
            -
          </button>
          <input
            type="number"
            min="0"
            value={ itemQuantity }
          />
          <button
            onClick={increaseCart}
          >
            +
          </button>
        </section>
      </div>
    </li>
  )
}

const mapStateToProps = ({ cartReducer }) => ({
  itens: cartReducer.itens,
  totalCart: cartReducer.totalCart,
})

const mapDispatchToProps = (dispatch) => ({
  setPrice: (total) => dispatch(setTotalCart(total))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);
