import api from "../lib/axios";
import type { ApiResponse } from "../types/apiResponse.type";
import type { AuthUser, DeleteAccountPayload, ForgotPasswordPayload, LoginPayload, Me, ResetPasswordPayload, SignupPayload } from "../types/auth.type";

export const signup = async (payload: SignupPayload): Promise<AuthUser> => {
    const { data: apiResponse } = await api.post<ApiResponse<AuthUser>>("/auth/signup", payload);
    return apiResponse.data;
};

export const login = async (payload: LoginPayload): Promise<AuthUser> => {
    const { data: apiResponse } = await api.post<ApiResponse<AuthUser>>("/auth/login", payload);
    return apiResponse.data;
};

export const me = async (): Promise<Me> => {
    const { data: apiResponse } = await api.get<ApiResponse<Me>>("/auth/me");
    return apiResponse.data;
}

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
}

export const deleteAccount = async (payload: DeleteAccountPayload): Promise<void> => {
   await api.post("/auth/delete-account", payload);
}

export const verifyEmail = async (verifyUrl: string) => {
    await api.get(decodeURIComponent(verifyUrl));
}

export const resendVerificationEmail = async () => {
    await api.post("/email/verification-notification");
}

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
    await api.post("/auth/forgot-password", payload);
}

export const resetPassword = async (payload: ResetPasswordPayload) => {
    await api.post("/auth/reset-password", payload);
}