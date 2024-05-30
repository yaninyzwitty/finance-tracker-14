import React from "react";
import AccountFilter from "./account-filter";
import DateFilter from "./date-filter";

type Props = {};

function Filters({}: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-y-0 gap-y-2 lg:gap-x-2">
      <AccountFilter />
      <DateFilter />
    </div>
  );
}

export default Filters;
