import Box from "../_components/Box";
import Image from "next/image";
import { db } from "@/src/prisma/db";

export default async function Projects() {
  const pageData = await db.orm.public.Page.where({
    page: "projects",
  }).first();

  const projects = await db.orm.public.Project.all();

  return (
    <div className="content">
      <h1 className="page-title">{pageData?.title}</h1>
      <p className="max-w-lg">{pageData?.text}</p>
      <div className="mt-4">
        {projects.map((project) => (
          <Box key={project.id}>
            <Image
              src={`/uploads/projects/${project.image}`}
              width={200}
              height={200}
              alt={project.title}
            />
            <div>
              <h2 className="text-lg font-semibold mt-2">{project.title}</h2>
              <p className="text-sm">{project.text}</p>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
}
