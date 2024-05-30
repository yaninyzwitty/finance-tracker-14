import { InferRequestType, InferResponseType  } from "hono";

import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { toast } from "sonner";
import {client} from "@/lib/hono"
type ResponseType = InferResponseType<typeof client.api.categories[':id']['$patch']>

type RequestType = InferRequestType<typeof client.api.categories[':id']['$patch']>['json'];

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const res = await client.api.categories[':id']['$patch']({ json, param: { id } });
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category', { id }]});
            queryClient.invalidateQueries({ queryKey: ['categories']});
            queryClient.invalidateQueries({ queryKey: ['transactions']});
            queryClient.invalidateQueries({ queryKey: ['summary']});

            toast.success('Category updated!')
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to updated category!')
        }
        
        
    });
    return mutation;
}