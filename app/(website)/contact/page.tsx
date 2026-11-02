import { db } from "@/src/prisma/db";
import ContactForm from "../_ui/contact-form";

export default async function Contact() {
  const pageData = await db.orm.public.Page.where({
    page: "contact",
  }).first();

  return (
    <div className="content">
      <h1 className="page-title">{pageData?.title}</h1>
      <p className="max-w-lg">{pageData?.text}</p>
      <ContactForm />
    </div>
  );
}
