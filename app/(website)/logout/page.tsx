"use client";

import { useEffect, useTransition } from "react";
import { logout } from "../_actions/auth";

export default function Logout() {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await logout();
    });
  }, []);
}
