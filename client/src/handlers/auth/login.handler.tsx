import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { LoginPayload } from "../../types/auth.type";

// Form Change
export const buildHandleFormLoginChange = (e: ChangeEvent<HTMLInputElement>, setForm: Dispatch<SetStateAction<LoginPayload>>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
}