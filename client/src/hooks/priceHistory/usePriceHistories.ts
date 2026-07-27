import { useQuery } from "@tanstack/react-query";
import type { Pricehistory } from "../../types/priceHistory.type";
import { getPriceHistories } from "../../services/priceHistory.service";

export function usePriceHistories() {
    return useQuery<Pricehistory[]>({
        queryKey: ["price-histories"],
        queryFn: getPriceHistories,
    });
}