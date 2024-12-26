import { z } from "zod";
import { ROLE } from "./user.interface";


const createUserZod = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: "Invalid email" }),
    password: z.string({ required_error: 'Password is required' }),
    role: z.nativeEnum(ROLE).optional(),
    image: z.string().optional(),
   
  }),
});

const updateUserZod = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    email: z.string({ required_error: 'Email is required' }).email({ message: "Invalid email" }).optional(),
    password: z.string({ required_error: 'Password is required' }).optional(),
    role: z.nativeEnum(ROLE).optional(),
    image: z.string().optional(),
   
  }),
});

export const userValidations = {
  createUserZod,
  updateUserZod,
};
