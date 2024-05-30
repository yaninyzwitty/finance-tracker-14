import { InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
type ResponseType = InferResponseType<typeof client.api.accounts[':id']['$delete']>


export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async(json) => {
            const res = await client.api.accounts[':id']['$delete']({  param: { id } });
            return await res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account', { id }]});
            queryClient.invalidateQueries({ queryKey: ['accounts']});
            queryClient.invalidateQueries({ queryKey: ['transactions']});
            // here invalidate summary and the transactions

            toast.success('Account deleted!')
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to delete account')
        }
        
        
    });
    return mutation;
}