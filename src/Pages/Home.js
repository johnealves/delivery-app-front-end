import React, { useEffect, useState } from "react"
import CardProduct from "../Components/CardProduct"
import api from "../services/axiosApi"
import '../CSS/home.css';
import Amount from "../Components/Amount";
import { connect } from "react-redux";
import { setTotalCart } from "../Redux/Actions";
import calcTotalCart from "../util/totalPurchase";

const Home = ({ itens, setPrice }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get('/products')
    .then((resp) => setProducts(resp.data.products))
    .catch((err) => console.log(err));
    (itens) && setPrice(calcTotalCart(itens));
  }, [itens, setPrice])

  return (
    <div className="home-container">
      <ul className="product-list">
        { products.map((product, i) => <CardProduct product={ product } key={ i } />) }
      </ul>
      <Amount />
    </div>
  )
}

const mapStateToProps = ({ cartReducer }) => ({
  itens: cartReducer.itens,
})

const mapDispatchToProps = (dispatch) => ({
  setPrice: (total) => dispatch(setTotalCart(total))
})


export default connect(mapStateToProps, mapDispatchToProps)(Home);