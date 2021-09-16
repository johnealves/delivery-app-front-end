let shoppingCart = []
const checkCart = JSON.parse(localStorage.getItem('b8398c04b1b936e0bde5361cd3cc3cb0'))
if (checkCart) {
  shoppingCart = checkCart
}

const INITIAL_STATE = {
  itens: shoppingCart,
  totalCart: 0,
}

// const getToken = localStorage.getItem('cookmasterToken');
// if (getToken) INITIAL_STATE['token'] = getToken;

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_TOTAL_CART":
      return {
        ...state,
        totalCart: action.total,
      }
    default:
      return state;
  }
}

export default cartReducer;