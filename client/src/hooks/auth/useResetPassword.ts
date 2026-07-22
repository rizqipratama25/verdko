import { useMutation } from "@tanstack/react-query"
import type { ResetPasswordPayload } from "../../types/auth.type"
import { resetPassword } from "../../services/auth.service"

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (payload : ResetPasswordPayload) => resetPassword(payload),
    })
}