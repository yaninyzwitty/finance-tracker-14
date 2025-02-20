import {z} from "zod";
import {Loader2} from "lucide-react";

import {insertTransactionSchema} from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {useNewTransaction} from "../hooks/use-new-transaction";
import {useCreateTransaction} from "../use-create-transaction";
import {useCreateCategory} from "@/features/categories/use-create-category";
import {useGetAccounts} from "@/features/accounts/use-get-accounts";
import {useGetCategories} from "@/features/categories/use-get-categories";
import {useCreateAccount} from "@/features/accounts/use-create-account";
import TransactionForm from "./transaction-form";

const fromSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof fromSchema>;

const NewTransactionSheet = () => {
  const {open, onClose} = useNewTransaction();

  const createMutation = useCreateTransaction();

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
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: (data) => {
        console.log(data);
        onClose();
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={CategoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={AccountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
