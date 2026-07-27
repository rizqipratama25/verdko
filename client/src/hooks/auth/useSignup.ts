import { useMutation } from "@tanstack/react-query"
import type { SignupPayload } from "../../types/auth.type"
import { saveAuth } from "../../utils/authStorage.utils"
import api from "../../lib/axios"
import { signup } from "../../services/auth.service"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (payload: SignupPayload) => signup(payload),
        onSuccess: (res) => {
            const user = res;
            saveAuth(res);
            api.defaults.headers.common.Authorization = `Bearer ${user.token}`
            navigate("/email-verify");
        }
    })
}