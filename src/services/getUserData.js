import api from "./axiosApi";

const getUserData = async (token) => {
  const response = await api.get('/user', { headers: { authorization: token } })
  
  return response.data
}

export default getUserData;