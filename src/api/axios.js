import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 3000,
})

instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default instance;