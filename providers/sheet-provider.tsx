"use client";
import {useMountedState} from "react-use";

import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditAccount from "@/features/accounts/components/edit-account";
import React from "react";
import NewCategorySheet from "@/features/categories/components/new-category-sheet";
import EditCategory from "@/features/categories/components/edit-category";
import NewTransaction from "@/features/transactions/components/new-transaction-sheet";
import EditTransaction from "@/features/transactions/components/edit-transaction";

function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <NewAccountSheet />
      <EditAccount />
      <NewCategorySheet />
      <EditCategory />
      <NewTransaction />
      <EditTransaction />
    </>
  );
}

export default SheetProvider;
