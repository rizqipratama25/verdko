import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { AuthUser, LoginPayload } from "../../types/auth.type";
import type { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

// Form Change
export const buildHandleFormLoginChange = (e: ChangeEvent<HTMLInputElement>, setForm: Dispatch<SetStateAction<LoginPayload>>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
}

export const buildHandleLoginSubmit = (
    form: LoginPayload, 
    login: (payload: LoginPayload) => Promise<AuthUser>,
    helpers: {
        resetForm: () => void;
    },
    navigate: NavigateFunction
) => async (e: FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
        await login(form);

        toast.success("Login successful!", { id: toastId });
        helpers.resetForm();
        navigate("/dashboard");
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message, { id: toastId });
    }
}