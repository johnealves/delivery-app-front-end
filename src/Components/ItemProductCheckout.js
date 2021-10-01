import React, { useEffect, useState } from 'react';
import api from '../services/axiosApi';
import '../CSS/checkout.css';

const ItemProductCheckout = ({ item }) => {
  const [product, setProduct] = useState()

  useEffect(() => {
    api.get(`/products/${item.id}`)
    .then((resp) => setProduct(resp.data.product))
    .catch((err) => console.log(err));
  }, [item.id])

  return (
    <li className="checkout-item-container">
      <p>
        <span>{ item.quantity }</span>
        <span> x</span>
        &nbsp;
        <span>{ (product) && product.name }</span>
      </p>
      <p>
        { `R$ ${item.quantity * item.price}` }
      </p>
    </li>
  )
}

export default ItemProductCheckout;