"use client";

import { useActionState } from "react";
import { BlogData } from "../../_lib/Blog/definitions";
import { FormState } from "../../_lib/Blog/definitions";

export default function BlogForm({
  formAction,
  blogData,
}: {
  formAction: (
    state: FormState | undefined,
    formData: FormData,
    projectId?: number,
  ) => Promise<FormState | undefined>;
  blogData?: BlogData | null;
}) {
  const [state, action, isPending] = useActionState(formAction, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col mb-2">
        <label htmlFor="title">Title</label>
        <input
          className="form-input"
          type="text"
          id="title"
          name="title"
          defaultValue={blogData?.title}
        />
        {state?.errors?.nested?.title && <p>{state.errors.nested.title}</p>}
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="text">Text</label>
        <textarea
          className="form-input"
          id="text"
          name="text"
          defaultValue={blogData?.text}
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
      <button
        className="block ml-auto mt-3 form-button"
        type="submit"
        disabled={isPending}
      >
        {blogData ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );
}
