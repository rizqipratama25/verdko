import api from "../lib/axios";
import type { ApiResponse } from "../types/apiResponse.type";
import type { MonitoredProduct } from "../types/monitoredProduct.type";

export async function getMonitoredProducts(): Promise<ApiResponse<MonitoredProduct[]>> {
    const { data } = await api.get<ApiResponse<MonitoredProduct[]>>("/monitored_products");
    return data;
}