import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi'
import '../CSS/amount.css';

const Amount = ({ totalCart }) => {

  return (
    <Link to="/checkout" className="amount-container">
      <FiShoppingCart /> &nbsp;{ `Total R$ ${totalCart}` }
    </Link>
  )
}

const mapStateToProps = ({ cartReducer }) => ({
  totalCart: cartReducer.totalCart,
})

export default connect(mapStateToProps)(Amount)
