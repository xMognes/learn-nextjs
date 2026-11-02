import path from "path";
import fs from "fs/promises";

export default async function uploadFile(
  file: File,
  targetPath: string,
): Promise<string> {
  if (!(file instanceof File)) {
    throw new Error("No file was selected.");
  }

  if (file.size === 0) {
    throw new Error("The file cannot be empty.");
  }

  const bytes = await file?.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), targetPath);

  await fs.mkdir(uploadDir, { recursive: true });

  const fileExt = path.extname(file.name);
  const fileName = crypto.randomUUID() + fileExt;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, buffer);

  return fileName;
}
