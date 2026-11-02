"use server";

import * as v from "valibot";
import { Resend } from "resend";
import { FormState, FormSchema } from "./definitions";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  state: FormState | undefined,
  formData: FormData,
) {
  const validatedForm = v.safeParse(FormSchema, {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedForm.success) {
    return {
      errors: v.flatten<typeof FormSchema>(validatedForm.issues),
    };
  }

  const { name, surname, email, message } = validatedForm.output;
  const { data: emailData, error: emailError } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "omeru.tr20@gmail.com",
    subject: "Website Form Submission",
    html: `Name/Surname: ${name} ${surname}<br />Email: ${email}<br />Message: ${message}`,
  });

  if (emailError) {
    console.error("Error sending email:", emailError);
    throw new Error("Failed to send email");
  }

  return { success: true, emailData };
}
