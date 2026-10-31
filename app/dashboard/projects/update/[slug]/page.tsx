import Link from "next/link";
import { db } from "@/src/prisma/db";
import ProjectForm from "@/app/dashboard/_ui/forms/project-form";
import { ProjectData } from "@/app/dashboard/_lib/Project/definitions";
import { update } from "@/app/dashboard/_lib/Project/actions";

export default async function ProjectUpdate({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const projectData = await db.orm.public.Project.select(
    "id",
    "title",
    "text",
    "image",
  )
    .where({
      id: Number(slug),
    })
    .first();

  return (
    <div>
      <div>
        <h1>Update Project</h1>
        <Link href="/dashboard/projects">Back to Projects</Link>
      </div>
      <ProjectForm
        formAction={update.bind(null, Number(slug))}
        projectData={projectData as ProjectData}
      />
    </div>
  );
}
