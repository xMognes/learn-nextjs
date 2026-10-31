import Link from "next/link";
import { db } from "@/src/prisma/db";
import Image from "next/image";

export default async function Projects() {
  const projects = await db.orm.public.Project.all();

  return (
    <div>
      <div className="content flex items-center">
        <h1>Projects</h1>
        <Link href="/dashboard/projects/create">Create Project</Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Text</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.text}</td>
                <td>
                  <Image
                    src={`/uploads/projects/${project.image}`}
                    alt={project.title}
                    width={75}
                    height={75}
                    style={{ width: 75, height: 75, objectFit: "cover" }}
                  />
                </td>
                <td>
                  <Link href={`/dashboard/projects/update/${project.id}`}>
                    Edit
                  </Link>
                  <Link href={`/dashboard/projects/delete/${project.id}`}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
