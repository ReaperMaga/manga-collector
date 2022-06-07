import api from "./api";

export async function login(password: string) {
    return api.post("/auth/login", { password });
}
