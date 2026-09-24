"use server";

import { db } from "@/src/prisma/db";
import * as v from "valibot";
import { FormSchema, FormState, formParse } from "./definitions";
import { refresh } from "next/cache";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

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

  const { page, title, text, image } = validatedForm.output;

  const pageQuery = await db.orm.public.Page.where({
    page: page,
  });

  let pageData = await pageQuery.first();

  let fileName = pageData?.image;
  if (image) {
    fileName = await uploadFile(image);
  }

  if (pageData) {
    if (pageData?.image) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const oldFileName = path.basename(pageData.image);
      const oldFilePath = path.join(uploadDir, oldFileName);

      try {
        await fs.unlink(oldFilePath);
      } catch (error) {
        if (
          error instanceof Error &&
          "code" in error &&
          error.code !== "ENOENT"
        ) {
          throw error;
        }
      }
    }

    pageData = await pageQuery.update({
      title: title,
      text: text,
      updatedAt: Temporal.Now.instant(),
      image: fileName,
    });
  } else {
    pageData = await db.orm.public.Page.create({
      page: page,
      title: title,
      text: text,
      image: fileName,
    });
  }

  refresh();
}

async function uploadFile(file: File): Promise<string> {
  if (!(file instanceof File)) {
    throw new Error("No file was selected.");
  }

  if (file.size === 0) {
    throw new Error("The file cannot be empty.");
  }

  const bytes = await file?.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");

  await fs.mkdir(uploadDir, { recursive: true });

  const fileExt = path.extname(file.name);
  const fileName = crypto.randomUUID() + fileExt;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, buffer);

  return fileName;
}
