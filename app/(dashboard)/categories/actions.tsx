"use client";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Edit, MoreHorizontal, Trash} from "lucide-react";

import {useConfirm} from "@/hooks/use-confirm";
import {useOpenCategory} from "@/features/categories/hooks/use-open-category";
import {useDeleteCategory} from "@/features/categories/use-delete-category";

type Props = {
  id: string;
};

function Actions({id}: Props) {
  const {onOpen} = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you?",
    "You are about to delete a category"
  );
  const deleteMutation = useDeleteCategory(id);
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate();
    }
  };
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => handleDelete()}
          >
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Actions;
