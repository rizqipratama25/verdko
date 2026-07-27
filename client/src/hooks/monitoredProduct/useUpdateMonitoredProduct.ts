import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { MonitoredProductPayload } from "../../types/monitoredProduct.type";
import { updateMonitoredProduct } from "../../services/monitoredProduct.service";

export const useUpdateMonitoredProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, payload} : {id: number, payload: MonitoredProductPayload}) => updateMonitoredProduct(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["monitored-products"] });
        }
    })
}