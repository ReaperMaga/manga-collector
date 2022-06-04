import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ? process.env.NEXT_PUBLIC_BACKEND_URL : "http://localhost:8991/",
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export function changePasswordHeader(password: string) {
    // @ts-ignore
    api.defaults.headers['Authorization'] = password
}

export default api