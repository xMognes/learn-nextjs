import { db } from "@/src/prisma/db";
import uploadFile from "../services";
import fs from "fs/promises";
import path from "path";

export async function createBlog(data: {
  title: string;
  text: string;
  image: File;
}): Promise<void> {
  const fileName = await uploadFile(data.image, "public/uploads/blog");

  await db.orm.public.Blog.create({
    title: data.title,
    text: data.text,
    image: fileName,
  });
}

export async function updateBlog(
  id: number,
  data: { title: string; text: string; image?: File },
): Promise<void> {
  const blogQuery = await db.orm.public.Blog.where({ id: id });
  const blogData = await blogQuery.first();

  let fileName: string | undefined = blogData?.image;
  if (data.image) {
    fileName = await uploadFile(data.image, "public/uploads/blog");

    const uploadDir = path.join(process.cwd(), "public/uploads/blog");
    const oldFileName = path.basename(blogData!.image);
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

  await blogQuery.update({
    title: data.title,
    text: data.text,
    updatedAt: Temporal.Now.instant(),
    image: fileName,
  });
}

export async function deleteBlog(id: number): Promise<void> {
  const blogQuery = await db.orm.public.Blog.where({ id: id });
  const blogData = await blogQuery.first();

  if (!blogData) {
    throw new Error("Blog not found.");
  }

  const uploadDir = path.join(process.cwd(), "public/uploads/blog");
  const fileName = path.basename(blogData.image);
  const filePath = path.join(uploadDir, fileName);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code !== "ENOENT") {
      throw error;
    }
  }

  await blogQuery.delete();
}
