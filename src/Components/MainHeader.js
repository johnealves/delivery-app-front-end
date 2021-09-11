import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiHome, BiLogInCircle, BiLogOutCircle, BiUser } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../CSS/mainHeader.css';
import { connect } from 'react-redux';

const MainHeader = ({ tokenRedux }) => {
  const history = useHistory();
  const token = tokenRedux;

  const handleLogout = () => {
    localStorage.removeItem('be6ab0c5114eebbcdeefb28cd016a5af');
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
              <Link exact to="/customer/orders">
                <BiUser className="nav-icons"/>
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