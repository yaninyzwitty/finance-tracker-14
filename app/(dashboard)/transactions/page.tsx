"use client";
import {DataTable} from "@/components/data-table";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {useNewTransaction} from "@/features/transactions/hooks/use-new-transaction";
import {useBulkDeleteTransactions} from "@/features/transactions/use-bulk-delete-transactions";
import {useGetTransactions} from "@/features/transactions/use-get-transactions";
import {Loader2, Plus} from "lucide-react";
import {useState} from "react";
import {columns} from "./columns";
import {UploadButton} from "./upload-button";
import ImportCard from "./import-card";
import {transactions as transacctionsSchema} from "@/db/schema";
import {useSelectAccount} from "@/hooks/use-select-account";
import {toast} from "sonner";
import {useBulkcreateTransactions} from "@/features/transactions/use-bulk-create-transactions";

type Props = {};

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const initialImportResults = {
  data: [],
  errors: [],
  meta: {},
};

function TransactionsPage({}: Props) {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [AccountDialog, confirm] = useSelectAccount();
  const [importResults, setImportResults] = useState(initialImportResults);
  const bulkCreateMutation = useBulkcreateTransactions();
  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const deleteTransactionsQuery = useBulkDeleteTransactions();
  const onUpload = (results: typeof initialImportResults) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(initialImportResults);
    setVariant(VARIANTS.LIST);
  };

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactionsQuery.isPending;
  const transactions = transactionsQuery.data || [];

  const onSubmitImport = async (
    values: (typeof transacctionsSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();
    if (!accountId) return toast.error("Please select an account to continue");
    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));
    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (transactionsQuery.isLoading) {
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
  if (variant === VARIANTS.IMPORT)
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center flex lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction history
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button
              size={"sm"}
              className="w-full lg:w-auto"
              onClick={newTransaction.onOpen}
            >
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactionsQuery.mutate({ids});
            }}
            columns={columns}
            filterKey="payee"
            data={transactions}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default TransactionsPage;
