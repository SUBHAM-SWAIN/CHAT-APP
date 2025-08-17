import axios from "axios"

export const axiosInstans = axios.create({
  baseURL:"http://localhost:5001/api" || import.meta.env.BACKEND_URL/api, 
  withCredentials:true
})
