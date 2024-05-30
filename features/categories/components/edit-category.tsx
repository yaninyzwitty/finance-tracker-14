import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {insertCategorySchema} from "@/db/schema";
import {useConfirm} from "@/hooks/use-confirm";
import {Loader2} from "lucide-react";
import {z} from "zod";
import {useOpenCategory} from "../hooks/use-open-category";
import {useDeleteCategory} from "../use-delete-category";
import {useEditCategory} from "../use-edit-category";
import {useGetCategory} from "../use-get-category";
import CategoryForm from "./category-form";
const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

function EditCategory() {
  const {open, onClose, id} = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you?",
    "You are about to delete a category"
  );
  const editMutation = useEditCategory(id);

  const categoryQuery = useGetCategory(id);
  const deleteMutation = useDeleteCategory(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = categoryQuery.data
    ? {name: categoryQuery.data.name}
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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin  " />
            </div>
          ) : (
            <>
              <CategoryForm
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

export default EditCategory;
