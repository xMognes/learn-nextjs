import { NextResponse } from "next/server";
import { deleteProject } from "@/app/dashboard/_lib/Project/services";

export async function DELETE(
  request: Request,
  { params }: RouteContext<"/dashboard/projects/delete/[id]">,
) {
  const { id } = await params;

  await deleteProject(Number(id));

  return NextResponse.json({ message: "Project deleted successfully." });
}
