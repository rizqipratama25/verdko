import api from "../lib/axios";
import type { ApiResponse } from "../types/apiResponse.type";
import type { MonitoredProduct } from "../types/monitoredProduct.type";

export async function getMonitoredProducts(): Promise<MonitoredProduct[]> {
    const { data: apiResponse } = await api.get<ApiResponse<MonitoredProduct[]>>("/monitored-products");
    return apiResponse.data;
}