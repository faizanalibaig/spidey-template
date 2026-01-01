import * as z from 'zod';

const SignupSchema = z.object({
  username: z.string().min(2).max(255),
  email: z.email().min(2).max(255),
  password: z.string().min(8).max(1024),
  picture: z.string().optional(),
  bio: z.string().max(255).optional(),
  xAccountId: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.email().min(2).max(255),
  password: z.string().min(8).max(1024),
});

export { SignupSchema, LoginSchema };
