import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

interface Token {
    access: string;
    refresh: string;
}

async function getToken(): Promise<Token | null> {
    const tokenString = await SecureStore.getItemAsync("token");
    if (tokenString) return JSON.parse(tokenString) as Token;
    return null;
}

async function setToken(token: Token) {
    await SecureStore.setItemAsync("token", JSON.stringify(token));
}

async function deleteToken() {
    await SecureStore.deleteItemAsync("token");
}

export { api, deleteToken, getToken, setToken, Token };
