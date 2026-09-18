"use client";

import { useActionState } from "react";
import { signup } from "../_actions/auth";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, undefined);

  return (
    <div className="content">
      <h1 className="page-title">Signup</h1>
      <form className="flex flex-col gap-2 mt-5" action={formAction}>
        <div>
          <input
            className="form-input"
            id="email"
            name="email"
            placeholder="Email"
          />
          {state?.errors?.nested?.email && <p>{state.errors.nested.email}</p>}
        </div>
        <div>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
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
        <button
          className="form-button ml-auto mt-2"
          disabled={isPending}
          type="submit"
        >
          Sign Up
        </button>
        {state?.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}
