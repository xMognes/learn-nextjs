"use client";

import { useActionState } from "react";
import { login } from "../actions/auth";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
        {state?.errors?.nested?.email && <p>{state.errors.nested.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        {state?.errors?.nested?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.nested.password.map((error, i) => (
                <li key={i}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button disabled={isPending} type="submit">
        Login
      </button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
