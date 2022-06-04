import api from "./api";

export async function login(password: string) {
    return await api.post("/auth/login", {password})
}