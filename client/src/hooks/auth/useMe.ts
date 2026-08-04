import { useQuery } from "@tanstack/react-query";
import type { Me } from "../../types/auth.type";
import { me } from "../../services/auth.service";

export function useMe() {
    return useQuery<Me>({
        queryKey: ["me"],
        queryFn: () => me(),
        refetchInterval: (query) => {
            const data = query.state.data;
            return data?.telegram_id ? false : 1500;
        },
    });
}