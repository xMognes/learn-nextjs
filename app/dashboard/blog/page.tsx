import Link from "next/link";
import { db } from "@/src/prisma/db";
import Image from "next/image";
import { remove } from "@/app/dashboard/_lib/Blog/actions";
import Form from "next/form";

export default async function Blog() {
  const blog = await db.orm.public.Blog.all();
  return (
    <>
      <div className="content flex items-center">
        <h1>Blog</h1>
        <Link href="/dashboard/blog/create">Create Blog</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Text</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blog.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.text}</td>
              <td>
                <Image
                  src={`/uploads/blog/${post.image}`}
                  alt={post.title}
                  width={75}
                  height={75}
                  style={{ width: 75, height: 75, objectFit: "cover" }}
                />
              </td>
              <td>
                <Link href={`/dashboard/blog/update/${post.id}`}>Edit</Link>
                <Link href={`/dashboard/blog/delete/${post.id}`}>Delete</Link>
                <Form action={remove.bind(null, post.id)}>
                  <button type="submit">Delete</button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
