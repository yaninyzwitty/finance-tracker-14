import { InferRequestType, InferResponseType  } from "hono";

import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"
type ResponseType = InferResponseType<typeof client.api.transactions['bulk-delete']['$post']>

type RequestType = InferRequestType<typeof client.api.transactions['bulk-delete']['$post']>['json']

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const res = await client.api.transactions['bulk-delete']['$post']({ json })
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions']});
            queryClient.invalidateQueries({ queryKey: ['summary']});
            toast.success('transaction deleted!')
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to delete transaction')
        }
        
         
    });
    return mutation;
}