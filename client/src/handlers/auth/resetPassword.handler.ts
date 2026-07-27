import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { ResetPasswordPayload } from "../../types/auth.type";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";

export const buildHandleFormResetPasswordChange = (e: ChangeEvent<HTMLInputElement>, setForm: Dispatch<SetStateAction<ResetPasswordPayload>>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
}

export const buildHandleResetPasswordSubmit = (
    form: ResetPasswordPayload,
    resetPassword: (payload: ResetPasswordPayload) => Promise<void>,
    helpers: {
        resetForm: () => void;
    },
    navigate: NavigateFunction
) => async (e: FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Resetting password...");

    try {
        await resetPassword(form);

        toast.success("Password reset successfully! Please login to continue", { id: toastId });
        helpers.resetForm();
        navigate("/login");
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message, { id: toastId });
    }
}