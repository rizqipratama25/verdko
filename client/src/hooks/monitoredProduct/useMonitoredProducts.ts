import { useQuery } from "@tanstack/react-query";
import type { MonitoredProduct } from "../../types/monitoredProduct.type";
import { getMonitoredProducts } from "../../services/monitoredProduct.service";

export function useMonitoredProducts() {
    return useQuery<MonitoredProduct[]>({
        queryKey: ["monitored-products"],
        queryFn: getMonitoredProducts,
    });
}