import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true // 🔴 VERY IMPORTANT
});

export default api;
