import { db } from "@/src/prisma/db";
import PageForm from "../../_ui/forms/page-form";

export default async function SiteProjects() {
  const page = await db.orm.public.Page.select("title", "text", "page")
    .where({
      page: "blog",
    })
    .first();

  return (
    <>
      <h1 className="mb-5 text-2xl">
        Edit Page: <u>Blog</u>
      </h1>
      <PageForm page={page} alias="blog" />
    </>
  );
}
