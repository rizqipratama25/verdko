import api from "../lib/axios";
import type { ApiResponse } from "../types/apiResponse.type";
import type { Summary } from "../types/dashboard.type";

export async function getSummary(): Promise<Summary> {
    const { data: apiResponse } = await api.get<ApiResponse<Summary>>("/summary");
    return apiResponse.data;
}