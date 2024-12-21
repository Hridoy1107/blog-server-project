import { z } from 'zod';

const userValidation = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(5, { message: 'Email must be at least 5 characters long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export default userValidation;
