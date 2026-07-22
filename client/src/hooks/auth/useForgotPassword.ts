import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "../../services/auth.service"
import type { ForgotPasswordPayload } from "../../types/auth.type"

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (payload : ForgotPasswordPayload) => forgotPassword(payload),
    })
}