const calcTotalCart = (itens) => {
  let total = 0
  itens.forEach((item) => (total += item.quantity * item.price))
  return total;
}

export default calcTotalCart;