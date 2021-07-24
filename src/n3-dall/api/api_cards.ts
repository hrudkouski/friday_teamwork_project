import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

// Types

// Api
export const loginApi = {}
export const registerApi = {}
export const recoveryPasswordApi = {}