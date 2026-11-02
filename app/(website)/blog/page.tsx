import Box from "../_components/Box";
import Image from "next/image";
import { db } from "@/src/prisma/db";
import Link from "next/link";

export default async function Blog() {
  const pageData = await db.orm.public.Page.where({
    page: "blog",
  }).first();

  const blogPosts = await db.orm.public.Blog.all();

  return (
    <div className="content">
      <h1 className="page-title">{pageData?.title}</h1>
      <p className="max-w-lg">{pageData?.text}</p>
      <div className="mt-4">
        {blogPosts.map((post) => (
          <Box key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <Image
                src={`/uploads/blog/${post.image}`}
                width={200}
                height={200}
                alt={post.title}
              />
              <div>
                <h2 className="text-lg font-semibold mt-2">{post.title}</h2>
                <p className="text-sm">{post.text}</p>
              </div>
            </Link>
          </Box>
        ))}
      </div>
    </div>
  );
}
