import * as v from "valibot";

export type FormState = {
  errors?: {
    nested?: {
      name?: string[];
      surname?: string[];
      email?: string[];
      message?: string[];
    };
  };
};

export const FormSchema = v.object({
  name: v.pipe(
    v.string("name must be a string."),
    v.nonEmpty("Please enter your name"),
  ),
  surname: v.pipe(
    v.string("surname must be a string."),
    v.nonEmpty("Please enter your surname"),
  ),
  email: v.pipe(
    v.string("email must be a string."),
    v.email("Please enter a valid email address"),
  ),
  message: v.pipe(
    v.string("message must be a string."),
    v.nonEmpty("Please enter your message"),
  ),
});
