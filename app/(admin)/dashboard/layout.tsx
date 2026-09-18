import React from "react";
import Sidebar from "./_ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh">
      <Sidebar />
      {children}
    </div>
  );
}
