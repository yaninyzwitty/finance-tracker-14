import { useQuery  } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetTransactions = () => {
    const searchParams = useSearchParams();
    const from = searchParams.get('from') || "";
    const to = searchParams.get('to') || "";
    const accountId = searchParams.get('accountId') || "";
    const query = useQuery({
        queryKey: ['transactions', { from , to, accountId}],
         
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query: { from, to, accountId }
            });
            if(!response.ok) {
                throw new Error("fAILED TO FETCH transactions");
            
            }
            const { data } = await response.json()
            return data.map((transaction) => ({
                ...transaction,
                amount: convertAmountFromMilliUnits(transaction.amount)
            }))
        }




        
    });
    return query;
}

