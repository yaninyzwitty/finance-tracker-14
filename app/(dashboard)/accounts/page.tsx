"use client";
import {DataTable} from "@/components/data-table";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {useNewAccount} from "@/features/accounts/hooks/use-new-account";
import {useGetAccounts} from "@/features/accounts/use-get-accounts";
import {useBulkDeleteAccounts} from "@/features/accounts/use-bulk-delete-accounts";
import {Loader2, Plus} from "lucide-react";
import {columns} from "./columns";

type Props = {};

function AccountsPage({}: Props) {
  const newAccount = useNewAccount();
  const accountsQuery = useGetAccounts();
  const deleteAccountsQuery = useBulkDeleteAccounts();

  const isDisabled = accountsQuery.isLoading || deleteAccountsQuery.isPending;
  if (accountsQuery.isLoading) {
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
  const accounts = accountsQuery.data || [];

  return (
    <div className="max-w-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center flex lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button size={"sm"} onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccountsQuery.mutate({ids});
            }}
            columns={columns}
            filterKey="name"
            data={accounts}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountsPage;
