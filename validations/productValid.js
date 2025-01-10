import * as z from "zod";

const productsSchema = z.object({
  title: z.string().min(6, "Tiêu đề phải có ít nhất 6 ký tự"),
  price: z
    .number({ required_error: "Giá là bắt buộc" })
    .min(0, "Giá phải lớn hơn hoặc bằng 0"),
  description: z.string().default("Updating"),
  isHidden: z.boolean().default(false),
  deletedAt: z.date().nullable().optional(),
});

export default productsSchema;
