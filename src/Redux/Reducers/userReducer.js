const INITIAL_STATE = {
  token: localStorage.getItem('be6ab0c5114eebbcdeefb28cd016a5af'),
  userData: JSON.parse(localStorage.getItem('b094a4ae07f4eed526322d8ad948a935'))
}

// const getToken = localStorage.getItem('cookmasterToken');
// if (getToken) INITIAL_STATE['token'] = getToken;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'NEW_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}

export default userReducer;