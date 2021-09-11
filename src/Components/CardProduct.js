import React from 'react';
import '../CSS/cardProduct.css';

const CardProduct = ({ product }) => {
  return (
    <li className="card-product-container">
      <div>
        <h5>{ product.name }</h5>
        <p max-length="150">{ product.description }</p>
        <p className="price-element">{ `R$ ${product.price}` }</p>
      </div>
      <div>
        <img src={ product.urlImage } alt={ `${product.name} foto` } />
      </div>
    </li>
  )
}

export default CardProduct