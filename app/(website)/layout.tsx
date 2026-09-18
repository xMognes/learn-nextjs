import React from "react";
import PageHeader from "../header";
import PageFooter from "../footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader />
      <main className="flex flex-1 items-center">{children}</main>
      <PageFooter />
    </>
  );
}
