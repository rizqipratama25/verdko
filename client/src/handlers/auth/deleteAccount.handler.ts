import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import type { DeleteAccountPayload } from "../../types/auth.type";

export const buildHandleFormDeletedAccountChange = (e: ChangeEvent<HTMLInputElement>, setForm: Dispatch<SetStateAction<DeleteAccountPayload>>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
}

export const buildHandleDeleteAccount = (
    form: DeleteAccountPayload,
    deleteAccount: (payload: DeleteAccountPayload) => Promise<void>,
    helpers: {
        setShowDeleteAccountModal: Dispatch<SetStateAction<boolean>>;
        resetForm: () => void;
    },
    navigate: NavigateFunction
) => async (e: FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Deleting Account...");

    try {
        await deleteAccount(form);

        toast.success("Account Deleted Successfully", { id: toastId });

        helpers.setShowDeleteAccountModal(false);
        helpers.resetForm();

        if (window.location.pathname === "/") {
            window.location.reload();
        } else {
            navigate("/");
        }

    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong";
        toast.error(message, { id: toastId });
    }
}