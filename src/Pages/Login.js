import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/axiosApi';
import '../CSS/Login.css'

function Login({ newToken, newUser }) {
  const history = useHistory();

  const onSubmit = (ev) => {
    ev.preventDefault()

    const email = document.getElementById('input-email').value
    const password = document.getElementById('input-password').value
    
    api.post(`/login`, {
      email,
      password,
    })
    .then(({ data: { token, ...userData } }) => {
      localStorage.setItem('be6ab0c5114eebbcdeefb28cd016a5af', token)
      localStorage.setItem('b094a4ae07f4eed526322d8ad948a935', JSON.stringify(userData))
    })
    .then(() => {
      history.push('/');
      window.location.reload();
    })
    .catch((err) => { 
      console.log(err)
      alert('Dados incorretos! Verifique usuario e senha e tente novamente.')
    })

  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="input-email" className="form-label">
            Email:
            <input id="input-email" className="form-control" type="text" placeholder="Email" required />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="input-password" className="form-label">
            Senha:
            <input id="input-password" className="form-control" type="password" placeholder="senha" required />
          </label>
        </div>
        <button type="submit" className="btn btn-primary"  onClick={ onSubmit } >
          Entrar
        </button>
        <div id="passwordHelpBlock" className="form-text">
          Ainda não é cadastrado? <Link to="/register">clique aqui</Link>
        </div>
      </form>
    </div>
  )
}

// const mapDispatchToProps = (dispatch) => ({
//   newToken: (token) => dispatch(setToken(token)),
//   newUser: (user) => dispatch(setUser(user))
// });

export default Login;