import { db } from "@/src/prisma/db";
import Image from "next/image";

export default async function BlogDetail({
  params,
}: {
  params: { slug: number };
}) {
  const { slug } = await params;
  const postData = await db.orm.public.Blog.where({ id: slug }).first();

  return (
    <div className="content">
      <Image
        src={`/uploads/blog/${postData?.image}`}
        width={200}
        height={200}
        alt={postData!.title}
      />
      <h1 className="page-title">{postData?.title}</h1>
      <p className="max-w-lg">{postData?.text}</p>
    </div>
  );
}
