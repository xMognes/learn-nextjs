"use client";

import { useActionState } from "react";
import { update } from "../../_lib/Page/actions";
import { PageData } from "../../_lib/Page/definitions";

export default function PageForm({ page }: { page: PageData | null }) {
  const [state, formAction, isPending] = useActionState(update, undefined);
  return (
    <form action={formAction}>
      <div className="flex flex-col mb-2">
        <label htmlFor="title">Title</label>
        <input
          className="form-input"
          type="text"
          defaultValue={page?.title}
          id="title"
          name="title"
        />

        {state?.errors?.nested?.title && <p>{state.errors.nested.title}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="text">Text</label>
        <textarea
          className="form-input"
          name="text"
          defaultValue={page?.text}
          id="text"
        ></textarea>
        {state?.errors?.nested?.text && <p>{state.errors.nested.text}</p>}
      </div>
      <input type="hidden" name="page" value="home" />
      <button
        className="block ml-auto mt-3 form-button"
        type="submit"
        disabled={isPending}
      >
        Save
      </button>
    </form>
  );
}
