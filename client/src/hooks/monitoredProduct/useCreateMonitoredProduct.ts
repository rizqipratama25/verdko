import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MonitoredProductPayload } from "../../types/monitoredProduct.type";
import { createMonitoredProduct } from "../../services/monitoredProduct.service";

export function useCreateMonitoredProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: MonitoredProductPayload) => createMonitoredProduct(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["monitored-products"] });
        }
    })
}