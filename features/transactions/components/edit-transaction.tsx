import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {insertTransactionSchema} from "@/db/schema";
import {useConfirm} from "@/hooks/use-confirm";
import {Loader2} from "lucide-react";
import {z} from "zod";
import {useOpenTransaction} from "../hooks/use-open-transaction";
import {useDeleteTransaction} from "../use-delete-transaction";
import {useEditTransaction} from "../use-edit-transaction";
import {useGetTransaction} from "../use-get-transaction";
import TransactionForm from "./transaction-form";
import {useCreateCategory} from "@/features/categories/use-create-category";
import {useGetCategories} from "@/features/categories/use-get-categories";
import {useGetAccounts} from "@/features/accounts/use-get-accounts";
import {useCreateAccount} from "@/features/accounts/use-create-account";
const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

function EditTransaction() {
  const {open, onClose, id} = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you?",
    "You are about to delete a transaction "
  );
  const editMutation = useEditTransaction(id);

  const transactionQuery = useGetTransaction(id);
  const deleteMutation = useDeleteTransaction(id);
  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();
  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });
  const CategoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });
  const AccountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isLoading ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading = transactionQuery.isLoading || categoryQuery.isLoading;
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin  " />
            </div>
          ) : (
            <>
              <TransactionForm
                id={id}
                onSubmit={onSubmit}
                onDelete={onDelete}
                defaultValue={defaultValues}
                disabled={isPending}
                categoryOptions={CategoryOptions}
                onCreateCategory={onCreateCategory}
                accountOptions={AccountOptions}
                onCreateAccount={onCreateAccount}
              />
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default EditTransaction;
