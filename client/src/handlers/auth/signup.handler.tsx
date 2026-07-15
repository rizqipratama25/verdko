import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type { AuthUser, SignupPayload } from "../../types/auth.type";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";

// Form Change
export const buildHandleFormSignupChange = (e: ChangeEvent<HTMLInputElement>, setForm: Dispatch<SetStateAction<SignupPayload>>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
}

export const buildHandleSignupSubmit = (
    form: SignupPayload,
    signup: (payload: SignupPayload) => Promise<AuthUser>,
    helpers: {
        resetForm: () => void;
    },
    navigate: NavigateFunction
) => async (e: FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Signing up...");

    try {
        await signup(form);

        toast.success("Signup successful!", { id: toastId });
        helpers.resetForm();
        navigate("/dashboard");
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message, { id: toastId });
    }
}