import axios from "axios";

const token = ''
const apiKey = ''

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
})
