import { InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
type ResponseType = InferResponseType<typeof client.api.categories[':id']['$delete']>


export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async(json) => {
            const res = await client.api.categories[':id']['$delete']({  param: { id } });
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category', { id }]});
            queryClient.invalidateQueries({ queryKey: ['categories']});
            queryClient.invalidateQueries({ queryKey: ['transactions']});
            queryClient.invalidateQueries({ queryKey: ['summary']});

            toast.success('Category deleted!')
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to delete category')
        }
        
        
    });
    return mutation;
}