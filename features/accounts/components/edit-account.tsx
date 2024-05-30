import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {insertAccountSchema} from "@/db/schema";
import {Loader2} from "lucide-react";
import {z} from "zod";
import {useOpenAccount} from "../hooks/use-open-account";
import {useEditAccount} from "../use-edit-account";
import {useDeleteAccount} from "../use-delete-account";
import {useGetAccount} from "../use-get-account";
import AccountForm from "./account-form";
import {useConfirm} from "@/hooks/use-confirm";
const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

function EditAccount() {
  const {open, onClose, id} = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you?",
    "You are about to delete an account "
  );
  const editMutation = useEditAccount(id);

  const accountQuery = useGetAccount(id);
  const deleteMutation = useDeleteAccount(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = accountQuery.isLoading;
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = accountQuery.data
    ? {name: accountQuery.data.name}
    : {
        name: "",
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin  " />
            </div>
          ) : (
            <>
              <AccountForm
                id={id}
                onSubmit={onSubmit}
                defaultValue={defaultValues}
                disabled={isPending}
                onDelete={onDelete}
              />
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default EditAccount;
