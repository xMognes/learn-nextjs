"use server";

import { redirect } from "next/navigation";
import { CreateFormSchema, UpdateFormSchema, FormState } from "./definitions";
import { createBlog, updateBlog, deleteBlog } from "./services";
import * as v from "valibot";

export async function create(state: FormState | undefined, formData: FormData) {
  const validatedForm = v.safeParse(CreateFormSchema, {
    title: formData.get("title"),
    text: formData.get("text"),
    image: formData.get("image"),
  });

  if (!validatedForm.success) {
    return {
      errors: v.flatten<typeof CreateFormSchema>(validatedForm.issues),
    };
  }

  await createBlog(validatedForm.output);

  redirect("/dashboard/blog");
}

export async function update(
  id: number,
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
  const formImage = formData.get("image") as File;
  const validatedForm = v.safeParse(UpdateFormSchema, {
    title: formData.get("title"),
    text: formData.get("text"),
    image:
      formImage instanceof File && formImage.size > 0 ? formImage : undefined,
  });

  if (!validatedForm.success) {
    return {
      errors: v.flatten<typeof UpdateFormSchema>(validatedForm.issues),
    };
  }

  await updateBlog(id, validatedForm.output);

  redirect("/dashboard/blog");
}

export async function remove(id: number): Promise<void> {
  await deleteBlog(id);

  redirect("/dashboard/blog");
}
