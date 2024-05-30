import { InferRequestType, InferResponseType  } from "hono";

import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"
type ResponseType = InferResponseType<typeof client.api.accounts[':id']['$patch']>

type RequestType = InferRequestType<typeof client.api.accounts[':id']['$patch']>['json'];

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const res = await client.api.accounts[':id']['$patch']({ json, param: { id } });
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account', { id }]});
            queryClient.invalidateQueries({ queryKey: ['accounts']});
            queryClient.invalidateQueries({ queryKey: ['transactions']});
            // here invalidate summary and the transactions

            toast.success('Account updated!')
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to updated account')
        }
        
        
    });
    return mutation;
}