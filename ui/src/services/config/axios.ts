import axios from "axios"
import { v1 } from "../helpers/QueryString"
import { AuthService } from "../auth/AuthService";
import { store } from "../../redux/store/store";
import { handleUnauthorized } from "../../redux/reducers/auth/AuthSlice";

const instance = axios.create({
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

// Process data before sending to server
instance.interceptors.request.use(async (config) => {
    if (config.url!.indexOf("/login") >=  0 || config.url!.indexOf("/refresh-token") >= 0) {
        return config
    }
    const token = window.localStorage.getItem("accessToken")
    config.headers["X-Token"] = token
    return config
}, err => {
    console.log(err)
    return Promise.resolve(err.request.data)
})

instance.interceptors.response.use(async (response) => {
    const axiosConfig = response.config
    if (axiosConfig.url!.indexOf("/login") >=  0 || axiosConfig.url!.indexOf("/google") >= 0 || axiosConfig.url!.indexOf("/refresh-token") >= 0) {
        return response.data
    }
    const { code, message } = response.data
    if ( code === 401) {
        if (message && message === "Error.Token.Expired") {
            const data = await AuthService.refreshToken()
            if (data.accessToken) {
                axiosConfig.headers["X-Token"] = data.accessToken
                window.localStorage.setItem("accessToken", data.accessToken)
                return instance(axiosConfig)
            } else {
                store.dispatch(handleUnauthorized(data.message))
            }
        }
    }

    if (code === 403) {
        if (message && message === "Error.Account.Locked.Expired") {
            store.dispatch(handleUnauthorized(message))
        }
    }
    return response.data
}, err => {
    console.log(err.message)
    return Promise.resolve(err.response.data)
})

export default instance
    