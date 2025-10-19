import z from "zod";

export const ProductOftenSearchListSchema = z.object({
  oftenSearchList: z.array(z.string()),
  handleClickPhrase: z.function({
    input: [z.string()],
    output: z.void(),
  }),
});

export type ProductOftenSearchListProps = z.infer<
  typeof ProductOftenSearchListSchema
>;
