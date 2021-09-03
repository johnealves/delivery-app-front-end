import React from 'react';
import '../CSS/cardProduct.css';

const CardProduct = ({ product }) => {
  return (
    <li className="card-product-container">
      <img src={ product.urlImage } alt={ `${product.name} foto` } />
      <p>{ product.name }</p>
      <p className="price-element">{ product.price }</p>
    </li>
  )
}

export default CardProduct