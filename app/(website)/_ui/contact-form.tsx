"use client";

import Form from "next/form";
import { useActionState } from "react";
import { sendEmail } from "../_lib/email/actions";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(sendEmail, undefined);

  return (
    <Form className="flex flex-col gap-2 mt-5" action={action}>
      <div className="flex gap-3">
        <input className="form-input" name="name" placeholder="Name" required />
        <input
          className="form-input"
          name="surname"
          placeholder="Surname"
          required
        />
        {state?.errors?.nested?.name && <p>{state.errors.nested.name}</p>}
        {state?.errors?.nested?.surname && <p>{state.errors.nested.surname}</p>}
      </div>
      <input
        className="form-input"
        name="email"
        placeholder="E-mail"
        required
      />
      {state?.errors?.nested?.email && <p>{state.errors.nested.email}</p>}
      <textarea
        className="form-input"
        name="message"
        placeholder="Message"
        required
      />
      {state?.errors?.nested?.message && <p>{state.errors.nested.message}</p>}
      <button
        className="form-button mt-2 ml-auto"
        type="submit"
        disabled={isPending}
      >
        Submit
      </button>
    </Form>
  );
}
