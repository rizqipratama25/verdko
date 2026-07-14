import api from "../lib/axios";
import type { ApiResponse } from "../types/apiResponse.type";
import type { MonitoredProduct, MonitoredProductPayload } from "../types/monitoredProduct.type";

export async function getMonitoredProducts(): Promise<MonitoredProduct[]> {
    const { data: apiResponse } = await api.get<ApiResponse<MonitoredProduct[]>>("/monitored-products");
    return apiResponse.data;
}

export async function createMonitoredProduct(payload: MonitoredProductPayload): Promise<MonitoredProduct> {
    const { data: apiResponse } = await api.post<ApiResponse<MonitoredProduct>>("/monitored-product", payload);
    return apiResponse.data;
}

export async function updateMonitoredProduct(id: number, payload: MonitoredProductPayload): Promise<MonitoredProduct> {
    const { data: apiResponse } = await api.put<ApiResponse<MonitoredProduct>>(`/monitored-product/${id}`, payload);
    return apiResponse.data;
}

export async function deleteMonitoredProduct(id: number): Promise<null> {
    const { data: apiResponse } = await api.delete<ApiResponse<null>>(`/monitored-product/${id}`);
    return apiResponse.data;
}