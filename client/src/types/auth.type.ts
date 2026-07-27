export interface AuthUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    telegram_username: string;
    telegram_id: string;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface DeleteAccountPayload {
    password: string;
}

export interface SignupPayload {
    name: string;
    telegram_username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}