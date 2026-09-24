import * as v from "valibot";

const PageType = ["home", "blog", "about", "contact", "projects"] as const;
const PageTypeSchema = v.picklist(PageType);

const ImageSchema = v.pipe(
  v.unknown(),
  v.transform((value) => {
    if (value instanceof File && value.size === 0) {
      return undefined;
    }

    return value;
  }),
  v.optional(
    v.pipe(
      v.file(),
      v.mimeType(
        ["image/jpeg", "image/png"],
        "Please select a JPEG or PNG file.",
      ),
      v.maxSize(1024 * 1024, "Please select a file smaller than 1 MB."),
    ),
  ),
);

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
  image: ImageSchema,
});

export function formParse(formData: FormData) {
  return v.safeParse(FormSchema, {
    page: formData.get("page"),
    title: formData.get("title"),
    text: formData.get("text"),
    image: formData.get("image"),
  });
}

export type FormState = {
  errors?: {
    nested?: {
      page?: string[];
      title?: string[];
      text?: string[];
      image?: string[];
    };
  };
};

export type PageData = {
  title: string;
  text: string;
  page: string;
};
