"use server";

import PageForm from "../../_ui/forms/page-form";
import { db } from "@/src/prisma/db";

export default async function SiteHome() {
  const page = await db.orm.public.Page.select("title", "text")
    .where({
      page: "home",
    })
    .first();

  return (
    <>
      <h1 className="mb-5 text-2xl">
        Edit Page: <u>Home</u>
      </h1>
      <PageForm page={page} />
    </>
  );
}
