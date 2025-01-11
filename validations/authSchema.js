import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1).email("This is not a valid email."),
    username: z.string().min(6).max(225),
    password: z.string().min(6).max(225),
    confirmPassword: z.string().min(6).max(225),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1).email("This is not a valid email."),
  password: z.string().min(6).max(225),
});
