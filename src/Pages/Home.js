import React, { useEffect, useState } from "react"
import CardProduct from "../Components/CardProduct"
import api from "../services/axiosApi"
import '../CSS/home.css';

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get('/products')
    .then((resp) => setProducts(resp.data.products))
    .catch((err) => console.log(err))
  }, [])

  return (
    <div className="home-container">
      <ul className="product-list">
        { products.map((product, i) => <CardProduct product={ product } key={ i } />) }
      </ul>
    </div>
  )
}

export default Home;