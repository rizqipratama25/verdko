import api from "../lib/axios";
import type { ApiResponse } from "../types/apiResponse.type";
import type { Pricehistory } from "../types/priceHistory.type";

export async function getPriceHistories(): Promise<Pricehistory[]> {
    const { data: apiResponse } = await api.get<ApiResponse<Pricehistory[]>>("/price-histories");
    return apiResponse.data;
}