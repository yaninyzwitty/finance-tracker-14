import Header from "@/components/header";
import React, {PropsWithChildren} from "react";

function DashboardLayout({children}: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>;
    </>
  );
}

export default DashboardLayout;
