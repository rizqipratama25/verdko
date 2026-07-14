import api from "../lib/axios";
import type { ApiResponse } from "../types/apiResponse.type";
import type { AuthUser, LoginPayload, SignupPayload } from "../types/auth.type";

export const signup = async (payload: SignupPayload): Promise<AuthUser> => {
    const { data: apiResponse } = await api.post<ApiResponse<AuthUser>>("/auth/signup", payload);
    return apiResponse.data;
};

export const login = async (payload: LoginPayload): Promise<AuthUser> => {
    const { data: apiResponse } = await api.post<ApiResponse<AuthUser>>("/auth/login", payload);
    return apiResponse.data;
};

export const me = async (): Promise<AuthUser> => {
    const { data: apiResponse } = await api.get<ApiResponse<AuthUser>>("/auth/me");
    return apiResponse.data;
}

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
}