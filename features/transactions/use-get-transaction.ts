import { useQuery  } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['transaction', { id }],
         
        queryFn: async () => {
            const response = await client.api.transactions[':id'].$get({
                param: { id },
            });
            if(!response.ok) {
                throw new Error("fAILED TO FETCH ACCOUNT");
            
            }
            const { data } = await response.json()
            return {
                ...data,
                amount: convertAmountFromMilliUnits(data.amount)
            };
        }
    });
    return query;
}