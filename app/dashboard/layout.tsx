import React from "react";
import Sidebar from "./_ui/sidebar";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh">
      <Sidebar />
      <div className="p-10">{children}</div>
    </div>
  );
}
