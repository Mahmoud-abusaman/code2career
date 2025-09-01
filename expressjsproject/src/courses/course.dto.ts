import { z } from "zod";

export const createCourseSchema = z.object({

  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.url().optional(),
});

export const updateCourseSchema = createCourseSchema;

