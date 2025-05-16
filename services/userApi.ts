import { api, Token } from "./api";

interface UserData {
    email: string;
    password: string;
}

interface ResponseData extends Pick<UserData, "email"> {
    id: string;
    token: Token;
}

const register = async (userData: UserData) => {
    return await api.post<ResponseData>("/register/", userData);
};

const login = async (userData: UserData) => {
    return await api.post<ResponseData>("/token/", userData);
};

export { register, login, UserData };
