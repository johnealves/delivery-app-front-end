import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../services/axiosApi';
import "../CSS/register.css";

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
        api.post(`/login`, {
          email: registerData.email,
          password: registerData.password,
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
      })
      .catch((err) => {
        console.log('[Erro] >', err);
        // console.log('[Erro] >', err.response.data.message);
      });
  }

  return (
    <div className="register-container">
      <h4>Novo cadastro</h4>
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
