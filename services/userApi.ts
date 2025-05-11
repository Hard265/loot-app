import { api, Token } from "./api";

interface UserData {
    email: string;
    password: string;
}

const register = async (userData: UserData) => {
    return await api.post("/register", userData);
};

const login = async (userData: UserData) => {
    return await api.post<Token>("/token", userData);
};

export { register, login, UserData };
