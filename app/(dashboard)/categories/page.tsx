"use client";
import {DataTable} from "@/components/data-table";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

import {useBulkDeleteCategories} from "@/features/use-bulk-delete-categories";
import {Loader2, Plus} from "lucide-react";
import {columns} from "./columns";
import {useNewCategory} from "@/features/categories/hooks/use-new-category";
import {useGetCategories} from "@/features/categories/use-get-categories";

type Props = {};

function CategoriesPage({}: Props) {
  const newCategory = useNewCategory();
  const categoryQuery = useGetCategories();
  const deleteCategoryQuery = useBulkDeleteCategories();

  const isDisabled = categoryQuery.isLoading || deleteCategoryQuery.isPending;
  if (categoryQuery.isLoading) {
    return (
      <div className="max-w-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const categories = categoryQuery.data || [];

  return (
    <div className="max-w-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center flex lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Categories page
          </CardTitle>
          <Button size={"sm"} onClick={newCategory.onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategoryQuery.mutate({ids});
            }}
            columns={columns}
            filterKey="name"
            data={categories}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesPage;
