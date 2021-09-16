import React from 'react';

const ItemProductCheckout = ({ product }) => {
  return (
    <li>
      <p>
        <span>{ product.quantity }</span>
        &nbsp;
        <span>{ product.id }</span>
      </p>
      <p>
        { `R$ ${product.quantity * product.price}` }
      </p>
      <hr />
    </li>
  )
}

export default ItemProductCheckout;