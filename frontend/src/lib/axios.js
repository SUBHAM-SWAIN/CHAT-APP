import axios from "axios"

export const axiosInstans = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://chat-app-takw.onrender.com/api",

  withCredentials:true
})
