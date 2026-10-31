"use client";

import { useActionState } from "react";
import { ProjectData } from "../../_lib/Project/definitions";
import { FormState } from "../../_lib/Project/definitions";

export default function ProjectForm({
  formAction,
  projectData,
}: {
  formAction: (
    state: FormState | undefined,
    formData: FormData,
    projectId?: number,
  ) => Promise<FormState | undefined>;
  projectData?: ProjectData | null;
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
          defaultValue={projectData?.title}
        />
        {state?.errors?.nested?.title && <p>{state.errors.nested.title}</p>}
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="text">Text</label>
        <textarea
          className="form-input"
          id="text"
          name="text"
          defaultValue={projectData?.text}
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
        {projectData ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
