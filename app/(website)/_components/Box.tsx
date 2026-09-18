import React from "react";

export default function Box({ children }: { children: React.ReactNode }) {
  return <div className="inline-flex border p-4">{children}</div>;
}
