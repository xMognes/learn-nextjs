"use client";

import { useActionState, useEffect } from "react";
import { update } from "../../_lib/Page/actions";
import { hrefType, PageData } from "../../_lib/Page/definitions";

export default function PageForm({
  page,
  alias,
  onSaved,
}: {
  page: PageData | null;
  alias: hrefType;
  onSaved?: (page: hrefType) => void;
}) {
  const [state, formAction, isPending] = useActionState(update, undefined);

  useEffect(() => {
    if (state?.success) {
      onSaved?.(alias);
    }
  }, [state, alias, onSaved]);

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
      <div className="flex flex-col mb-2">
        <label htmlFor="text">Text</label>
        <textarea
          className="form-input"
          name="text"
          defaultValue={page?.text}
          id="text"
        ></textarea>
        {state?.errors?.nested?.text && <p>{state.errors.nested.text}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="image">Image</label>
        <input
          className="form-input"
          type="file"
          name="image"
          id="image"
          accept="image/jpeg,image/png,image/webp"
        />
        {state?.errors?.nested?.image && <p>{state.errors.nested.image}</p>}
      </div>
      <input type="hidden" name="page" value={alias} />
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
