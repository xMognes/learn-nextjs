"use client";

import { useEffect, useTransition } from "react";
import { logout } from "../actions/auth";

export default function Logout() {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await logout();
    });
  }, []);
}
