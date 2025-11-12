import z from "zod";

export const SearchUiSchema = z.object({
  placeholder: z.string(),
  value: z.string(),
  setQuery: z.function({
    input: [z.string()],
    output: z.void(),
  })
});

export type SearchUiProps = z.infer<typeof SearchUiSchema>;
