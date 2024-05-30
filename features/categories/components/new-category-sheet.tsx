import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import {useNewCategory} from "../hooks/use-new-category";
import CategoryForm from "./category-form";
import {z} from "zod";
import {insertCategorySchema} from "@/db/schema";
import {useCreateCategory} from "../use-create-category";
const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

function NewCategorySheet() {
  const {open, onClose} = useNewCategory();
  const mutation = useCreateCategory();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organise your transactions
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          defaultValue={{
            name: "",
          }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
}

export default NewCategorySheet;
