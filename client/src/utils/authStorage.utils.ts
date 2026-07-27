import type { AuthUser } from "../types/auth.type";


const TOKEN_KEY = "verdko_token";
const VERIFIED_AT_KEY = "verdko_verified_at";
const USER_KEY = "verdko_user";

export const saveAuth = (user: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, user.token);
    localStorage.setItem(VERIFIED_AT_KEY, user.email_verified_at);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(VERIFIED_AT_KEY);
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getVerifiedAt = () => localStorage.getItem(VERIFIED_AT_KEY);

export const getUser = () => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}