import axios from "axios";

const api = axios.create({ baseURL: "https://john-delivery-app.herokuapp.com/" })

export default api;