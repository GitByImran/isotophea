import * as z from "zod";

export const signUpvalidation = z.object({
  username: z.string().min(3, {
    message: "too short",
  }),
  name: z.string().min(3, {
    message: "too short",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "password must be at least 8 characters",
  }),
});

export const signInvalidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "password must be at least 8 characters",
  }),
});

export const postValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

export const profileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});
