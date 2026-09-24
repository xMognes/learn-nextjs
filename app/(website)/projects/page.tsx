import Box from "../_components/Box";
import Image from "next/image";
import { db } from "@/src/prisma/db";

export default async function Projects() {
  const pageData = await db.orm.public.Page.where({
    page: "projects",
  }).first();

  return (
    <div className="content">
      <h1 className="page-title">{pageData?.title}</h1>
      <p className="max-w-lg">{pageData?.text}</p>
      <div className="mt-4">
        <Box>
          <Image
            src="/developer-man.jpg"
            width={200}
            height={200}
            alt="Project-1"
          />
        </Box>
        <Box>
          <Image
            src="/developer-man.jpg"
            width={200}
            height={200}
            alt="Project-1"
          />
        </Box>
        <Box>
          <Image
            src="/developer-man.jpg"
            width={200}
            height={200}
            alt="Project-1"
          />
        </Box>
      </div>
    </div>
  );
}
