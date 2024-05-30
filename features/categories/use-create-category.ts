import { InferRequestType, InferResponseType  } from "hono";

import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"
type ResponseType = InferResponseType<typeof client.api.categories.$post>

type RequestType = InferRequestType<typeof client.api.categories.$post>['json'];

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const res = await client.api.categories.$post({ json });
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories']});
            toast.success('Category created!')
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to create category')
        }
        
        
    });
    return mutation;
}