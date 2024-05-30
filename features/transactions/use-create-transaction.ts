import { InferRequestType, InferResponseType  } from "hono";

import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"
type ResponseType = InferResponseType<typeof client.api.transactions.$post>

type RequestType = InferRequestType<typeof client.api.transactions.$post>['json'];

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const res = await client.api.transactions.$post({ json });
            return await res.json()
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['transactions']});
            queryClient.invalidateQueries({ queryKey: ['summary']});
            toast.success('transaction created!')
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to create transaction')
        }
        
        
    });
    return mutation;
}