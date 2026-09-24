import Image from "next/image";
import { db } from "@/src/prisma/db";

export default async function About() {
  const pageData = await db.orm.public.Page.where({
    page: "about",
  }).first();

  return (
    <div className="content flex items-center">
      <div>
        <h1 className="page-title">{pageData?.title}</h1>
        <p className="max-w-md">{pageData?.text}</p>
      </div>
      {pageData?.image && (
        <Image
          src={"/uploads/" + pageData.image}
          width={256}
          height={340}
          alt="About"
          className="ml-10"
        />
      )}
    </div>
  );
}
