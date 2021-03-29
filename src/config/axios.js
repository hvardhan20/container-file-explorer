import axios from "axios"

console.log("PORT IS ", process.env.REACT_APP_FLASK_PORT);
let axiosInstance = axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_FLASK_PORT}`,
    timeout: 20000
})

export default axiosInstance