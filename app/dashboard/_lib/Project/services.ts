import { db } from "@/src/prisma/db";
import fs from "fs/promises";
import path from "path";

export async function deleteProject(projectId: number): Promise<void> {
  const projectQuery = await db.orm.public.Project.where({
    id: projectId,
  });
  const projectData = await projectQuery.first();

  if (!projectData) {
    throw new Error("Project not found.");
  }

  const uploadDir = path.join(process.cwd(), "public/uploads/projects");
  const fileName = path.basename(projectData.image);
  const filePath = path.join(uploadDir, fileName);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code !== "ENOENT") {
      throw error;
    }
  }

  await projectQuery.delete();
}
