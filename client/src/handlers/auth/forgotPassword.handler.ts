import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { ForgotPasswordPayload } from "../../types/auth.type";
import toast from "react-hot-toast";

// Form Change
export const buildHandleFormForgotPasswordChange = (e: ChangeEvent<HTMLInputElement>, setForm: Dispatch<SetStateAction<ForgotPasswordPayload>>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
}

export const buildHandleForgotPasswordSubmit = (
    form: ForgotPasswordPayload,
    forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>,
    helpers: {
        resetForm: () => void;
    },
) => async (e: FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Please wait...");

    try {
        await forgotPassword(form);

        toast.success("Check your email!", { id: toastId });
        helpers.resetForm();
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message, { id: toastId });
    }
}