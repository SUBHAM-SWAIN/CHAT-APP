import axios from "axios"

export const axiosInstans = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials:true
})
