import Link from "next/link";
import BlogForm from "@/app/dashboard/_ui/forms/blog-form";
import { db } from "@/src/prisma/db";
import { update } from "@/app/dashboard/_lib/Blog/actions";
import { BlogData } from "@/app/dashboard/_lib/Blog/definitions";

export default async function UpdateBlog({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const blogData = await db.orm.public.Blog.select(
    "id",
    "title",
    "text",
    "image",
  )
    .where({
      id: id,
    })
    .first();

  return (
    <>
      <div>
        <h1>Update Blog Post</h1>
        <Link href="/dashboard/blog">Back to Blog</Link>
      </div>
      <BlogForm
        formAction={update.bind(null, id)}
        blogData={blogData as BlogData}
      />
    </>
  );
}
