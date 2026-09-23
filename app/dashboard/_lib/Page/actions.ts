"use server";

import { db } from "@/src/prisma/db";
import * as v from "valibot";
import { FormSchema, FormState, formParse } from "./definitions";
import { refresh } from "next/cache";

export async function update(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
  const validatedForm = formParse(formData);
  if (!validatedForm.success) {
    return {
      errors: v.flatten<typeof FormSchema>(validatedForm.issues),
    };
  }

  const { page, title, text } = validatedForm.output;

  const pageQuery = await db.orm.public.Page.where({
    page: page,
  });

  let pageData = await pageQuery.first();
  if (pageData) {
    pageData = await pageQuery.update({
      title: title,
      text: text,
      updatedAt: Temporal.Now.instant(),
    });
  } else {
    pageData = await db.orm.public.Page.create({
      page: page,
      title: title,
      text: text,
    });
  }

  refresh();
}
