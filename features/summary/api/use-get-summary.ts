import { useQuery  } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetSummary = () => {
    const searchParams = useSearchParams();
    const from = searchParams.get('from') || "";
    const to = searchParams.get('to') || "";
    const accountId = searchParams.get('accountId') || "";
    const query = useQuery({
        queryKey: ['summary', { from , to, accountId}],
         
        queryFn: async () => {
            const response = await client.api.summary.$get({
                query: { from, to, accountId }
            });
            if(!response.ok) {
                throw new Error("fAILED TO FETCH transactions");
            
            }
            const { data } = await response.json()
            return {
                ...data,
                income: convertAmountFromMilliUnits(data.incomeAmount),
                expenses: convertAmountFromMilliUnits(data.expensesAmount),
                remaining: convertAmountFromMilliUnits(data.remainingAmount),
                categories: data.categories.map((category) => ({
                    ...category,
                    value: convertAmountFromMilliUnits(category.value),
                })),
                days: data.days.map((day) => ({
                    ...day,
                    income: convertAmountFromMilliUnits(day.income as number),
                    expenses: convertAmountFromMilliUnits(day.expenses as number),
                }))
            }
            }




        
    });
    return query;
}

