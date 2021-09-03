import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiHome, BiLogInCircle, BiLogOutCircle, BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import '../CSS/mainHeader.css';

const MainHeader = () => {
  const history = useHistory();
  const token = localStorage.getItem("be6ab0c5114eebbcdeefb28cd016a5af");

  const handleLogout = () => {
    localStorage.removeItem('be6ab0c5114eebbcdeefb28cd016a5af');
    window.location.reload();
    history.push('/');
  }

  return (
    <header className="main-header-container">
      <Link exact to="/">
        <BiHome />
      </Link>
      <section>
        {/* <BiUser />
        <BiLogInCircle /> */}
        {
          (!token) ? (
            <>
              <Link to="/register">
                <BiUser />&nbsp;
              </Link>
              <Link to="/login">
                <BiLogInCircle />&nbsp;
              </Link>
            </>
          ) : (
            <>
              <Link exact to="/orders">
                <BiUser />&nbsp;
              </Link>
              <Link to="">
                <button type="button" onClick={ handleLogout }>
                  <BiLogOutCircle />&nbsp;
                </button>
              </Link>
            </>
          )
        }
      </section>
    </header>
  );
}

export default MainHeader;