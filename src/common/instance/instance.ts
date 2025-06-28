import axios from "axios";

const token = '68e45cb4-ad1f-4ab1-87c1-7fe4745582b4'
const apiKey = '5d2e37f1-395e-4105-b8eb-f1ffe52ce33f'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
})