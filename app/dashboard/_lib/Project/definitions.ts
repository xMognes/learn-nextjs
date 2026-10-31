import * as v from "valibot";

export type FormState = {
  errors?: {
    nested?: {
      title?: string[];
      text?: string[];
      image?: string[];
    };
  };
};

export type ProjectData = {
  id: number;
  title: string;
  text: string;
  image: string;
};

const ImageSchema = v.pipe(
  v.file(),
  v.mimeType(["image/jpeg", "image/png"], "Please select a JPEG or PNG file."),
  v.maxSize(1024 * 1024, "Please select a file smaller than 1 MB."),
);

const BaseFormSchema = {
  title: v.pipe(
    v.string("title must be a string."),
    v.nonEmpty("Please enter title"),
  ),
  text: v.pipe(
    v.string("text must be a string."),
    v.nonEmpty("Please enter text"),
  ),
};

export const CreateFormSchema = v.object({
  ...BaseFormSchema,
  image: ImageSchema,
});

export const UpdateFormSchema = v.object({
  ...BaseFormSchema,
  image: v.optional(ImageSchema),
});
