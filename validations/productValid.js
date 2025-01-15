import { z } from "zod";

const productsSchema = z.object({
  title: z.string().min(3),
  price: z.number().min(0),
  categoryId: z.string().optional(),
  description: z.string().optional(),
  slug: z.string().optional(),
});

export default productsSchema;
