import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../services/axiosApi';

const Register = () => {
  const [registerData, setRegisterData] = useState({})
  const history = useHistory();

  const handleRegisterData = ({ target: { value, name } }) => {
    setRegisterData({
      ...registerData,
      [`${name}`]: value
    })
  }

  const handleRegister = (ev) => {
    ev.preventDefault();
    console.log('click')
    api.post('/register', registerData)
      .then((response) => {
        console.log(response);
        history.push('/');
      })
      .catch((err) => {
        console.log('[Erro] >', err);
        // console.log('[Erro] >', err.response.data.message);
      });
  }

  return (
    <div className="register-container">
      <h5>Novo usuario</h5>
      <form>
        <div className="mb-3">
          <label htmlFor="form-fullname" className="form-label">
            Nome: 
            <input 
              id="form-fullname"
              className="form-control"
              type="text"
              name="name"
              placeholder="Digite seu nome"
              required 
              onInput={ handleRegisterData }
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="form-email" className="form-label">
            E-mail:
            <input
              id="form-email"
              className="form-control"
              type="email"
              name="email"
              placeholder="E-mail..."
              onInput={ handleRegisterData }
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="form-password" className="form-label">
            Senha:
            <input
              id="form-password"
              className="form-control"
              type="password"
              name="password"
              placeholder="minimo 6 digitos"
              onInput={ handleRegisterData }
              required
            />
          </label>
        </div>
        <button type="button" className="btn btn-success" onClick={ handleRegister }>
          Cadastrar
        </button>
      </form>
    </div>
  )
      
}

export default Register;
