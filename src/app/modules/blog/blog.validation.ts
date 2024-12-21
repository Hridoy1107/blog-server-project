import { z } from 'zod';

const blogValidation = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required and must be at least 1 character long.',
    })
    .max(255, { message: 'Title must not exceed 255 characters.' }),
  content: z
    .string()
    .min(1, {
      message: 'Content is required and must be at least 1 character long.',
    }),
  author: z
    .string()
    .regex(/^[a-f\d]{24}$/i, {
      message: 'Author must be a valid MongoDB ObjectId.',
    }),
  isPublished: z.boolean().optional().default(true),
});

export default blogValidation;
