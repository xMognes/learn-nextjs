"use client";

import Link from "next/link";
import BlogForm from "../../_ui/forms/blog-form";
import { create } from "../../_lib/Blog/actions";

export default function CreateBlog() {
  return (
    <>
      <div>
        <h1>Create Blog</h1>
        <Link href="/dashboard/blog">Back to Blogs</Link>
      </div>
      <BlogForm formAction={create} />
    </>
  );
}
