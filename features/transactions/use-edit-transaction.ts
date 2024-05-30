import { InferRequestType, InferResponseType  } from "hono";

import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"
type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$patch']>

type RequestType = InferRequestType<typeof client.api.transactions[':id']['$patch']>['json'];

export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const res = await client.api.transactions[':id']['$patch']({ json, param: { id } });
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transaction', { id }]});
            queryClient.invalidateQueries({ queryKey: ['transactions']});
            // here invalidate summary 

            toast.success('transaction updated!')
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to update transaction')
        }
        
        
    });
    return mutation;
}