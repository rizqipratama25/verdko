import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMonitoredProduct } from "../../services/monitoredProduct.service";

export const useDeleteMonitoredProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => deleteMonitoredProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["monitored-products"] });
        }
    })
}