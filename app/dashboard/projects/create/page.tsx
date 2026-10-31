import Link from "next/link";
import ProjectForm from "../../_ui/forms/project-form";
import { create } from "../../_lib/Project/actions";

export default function CreateProject() {
  return (
    <div>
      <div>
        <h1>Create Project</h1>
        <Link href="/dashboard/projects">Back to Projects</Link>
      </div>
      <ProjectForm formAction={create} />
    </div>
  );
}
