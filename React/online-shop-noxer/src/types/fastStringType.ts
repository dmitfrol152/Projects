import z from "zod";
export const ParametrSchema = z.object({
  parameters_list: z.array(z.string()),
});

export type ParametrProps = z.infer<typeof ParametrSchema>;

export const FastSchema = z.object({
  fast_search_strings: ParametrSchema,
});

export type FastProps = z.infer<typeof FastSchema>;
