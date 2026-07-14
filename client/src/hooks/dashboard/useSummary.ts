import { useQuery } from "@tanstack/react-query";
import type { Summary } from "../../types/dashboard.type";
import { getSummary } from "../../services/dashboard.service";

export function useSummary() {
    return useQuery<Summary>({
        queryKey: ["summary"],
        queryFn: () => getSummary(),
    });
}