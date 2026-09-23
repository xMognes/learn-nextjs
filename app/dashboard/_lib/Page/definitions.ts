import * as v from "valibot";

const PageType = ["home", "blog", "about", "contact", "projects"] as const;
const PageTypeSchema = v.picklist(PageType);

export const FormSchema = v.object({
  page: PageTypeSchema,
  title: v.pipe(
    v.string("title must be a string."),
    v.nonEmpty("Please enter title"),
  ),
  text: v.pipe(
    v.string("text must be a string."),
    v.nonEmpty("Please enter text"),
  ),
});

export function formParse(formData: FormData) {
  return v.safeParse(FormSchema, {
    page: formData.get("page"),
    title: formData.get("title"),
    text: formData.get("text"),
  });
}

export type FormState = {
  errors?: {
    nested?: {
      page?: string[];
      title?: string[];
      text?: string[];
    };
  };
};

export type PageData = {
  title: string;
  text: string;
};
