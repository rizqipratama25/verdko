import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../services/auth.service";
import { clearAuth } from "../../utils/authStorage.utils";
import api from "../../lib/axios";
import type { DeleteAccountPayload } from "../../types/auth.type";

export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: (payload: DeleteAccountPayload) => deleteAccount(payload),
        onSuccess: () => {
            clearAuth();
            delete api.defaults.headers.common.Authorization;
        }
    })
}