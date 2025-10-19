import z from "zod";

export const ProductOftenSearchItemSchema = z.object({
  phrase: z.string(),
  handleClickPhrase: z.function({
    input: [z.string()],
    output: z.void(),
  }),
});

export type ProductOftenSearchItemProps = z.infer<
  typeof ProductOftenSearchItemSchema
>;
