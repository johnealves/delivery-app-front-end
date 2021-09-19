import React from 'react';
import '../CSS/cardAddressToDelivery.css'

const CardAddressToDelivery = ({ address }) => {

  if (address === {}) return (
    <div className="delivery-address-container">
      <h6>Nenhum endereço cadastrado</h6>
      <p>
        Cadastre ao menos um endereço para fazer pedidos
      </p>
    </div>
  )
  
  return (
    <div className="delivery-address-container">
      <h6>Endereço para entrega:</h6>
      <p>
        <span>Endereço: </span>
        <span>{ address.street }</span>
        <span>{ ` nº ${address.number} ` }</span>
        { (address.complement) && <span>{ address.complement }</span> }
      </p>
      <p>
        <span>{ `Bairro: ${address.district}` }</span>
        &nbsp;&nbsp;
        <span>{ `Cidade: ${address.city}` }</span>
      </p>
    </div>
  )
}

export default CardAddressToDelivery;
