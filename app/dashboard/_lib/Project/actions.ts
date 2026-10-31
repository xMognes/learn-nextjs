"use server";

import { CreateFormSchema, UpdateFormSchema, FormState } from "./definitions";
import * as v from "valibot";
import { db } from "@/src/prisma/db";
import fs from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import { deleteProject } from "./services";

export async function create(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
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

  const { title, text, image } = validatedForm.output;
  const fileName = await uploadFile(image);

  await db.orm.public.Project.create({
    title: title,
    text: text,
    image: fileName,
  });

  redirect("/dashboard/projects");
}

export async function update(
  projectId: number,
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

  const projectQuery = await db.orm.public.Project.where({
    id: projectId,
  });
  const projectData = await projectQuery.first();

  const { title, text, image } = validatedForm.output;

  let fileName = projectData?.image;
  if (image) {
    fileName = await uploadFile(image);

    const uploadDir = path.join(process.cwd(), "public/uploads/projects");
    const oldFileName = path.basename(projectData!.image);
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

  await projectQuery.update({
    title: title,
    text: text,
    updatedAt: Temporal.Now.instant(),
    image: fileName,
  });

  redirect("/dashboard/projects");
}

export async function remove(projectId: number): Promise<void> {
  await deleteProject(projectId);

  redirect("/dashboard/projects");
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

  const uploadDir = path.join(process.cwd(), "public/uploads/projects");

  await fs.mkdir(uploadDir, { recursive: true });

  const fileExt = path.extname(file.name);
  const fileName = crypto.randomUUID() + fileExt;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, buffer);

  return fileName;
}
