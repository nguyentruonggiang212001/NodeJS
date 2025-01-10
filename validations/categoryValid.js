import * as z from "zod";

const categorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  slug: z.string().optional(),
  isHidden: z.boolean().default(false),
  deletedAt: z.date().nullable().optional(),
  products: z
    .array(
      z.object({
        productId: z.string(),
      })
    )
    .optional(),
});

export default categorySchema;
