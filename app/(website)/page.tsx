import { db } from "@/src/prisma/db";
import Button from "./_components/Button";

export default async function Home() {
  const pageData = await db.orm.public.Page.where({
    page: "home",
  }).first();

  return (
    <div className="content">
      <h1 className="page-title">{pageData?.title}</h1>
      <p className="max-w-md">{pageData?.text}</p>
      <div className="flex gap-4 mt-4">
        <Button href="/about">View About</Button>
        <Button href="/projects">View Projects</Button>
      </div>
    </div>
  );
}
