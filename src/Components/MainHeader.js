import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiHome, BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa';
import { RiFileList3Line } from 'react-icons/ri';
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import '../CSS/mainHeader.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import getUserData from '../services/getUserData';
import { useState } from 'react';

const MainHeader = ({ tokenRedux }) => {
  const history = useHistory();
  const [role, setRole] = useState()
  const token = tokenRedux;

  useEffect(() => {
    getUserData(token).then(resp => setRole(resp.role))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('be6ab0c5114eebbcdeefb28cd016a5af');
    localStorage.removeItem('b094a4ae07f4eed526322d8ad948a935');
    localStorage.removeItem("b8398c04b1b936e0bde5361cd3cc3cb0")
    window.location.reload();
    history.push('/');
  }

  return (
    <header className="main-header-container">
      <Link exact to="/">
        <BiHome />
        <p>Inicio</p>
      </Link>
      <section>
        {/* <BiUser />
        <BiLogInCircle /> */}
        {
          (!token) ? (
            <div>
              <Link to="/register">
                <FaRegUserCircle className="nav-icons"/>
                <p>Cadastre-se</p>
              </Link>
              <Link to="/login">
                <BiLogInCircle className="nav-icons"/>
                <p>Entrar</p>
              </Link>
            </div>
          ) : (
            <div>
              <Link exact to="/checkout">
                <FiShoppingCart />
                <p>Carrinho</p>
              </Link>
              <Link to="/orders">
                <RiFileList3Line className="nav-icons"/>
                <p>Pedidos</p>
              </Link>
              <Link to="">
                <button type="button" onClick={ handleLogout }>
                  <BiLogOutCircle className="nav-icons"/>
                  <p>Sair</p>
                </button>
              </Link>
            </div>
          )
        }
      </section>
    </header>
  );
}

const mapStateReducer = ({ userReducer }) => ({
  tokenRedux: userReducer.token,
})

export default connect(mapStateReducer)(MainHeader);