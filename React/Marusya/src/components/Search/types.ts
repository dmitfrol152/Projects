import { z } from "zod";

export const ISearchPropsSchema = z.object({
  type: z.string(),
  label: z.string(),
  placeholder: z.string(),
});

export type ISearchProps = z.infer<typeof ISearchPropsSchema>;

export const ISearchStorePropsSchema = z.object({
  searchValue: z.string(),
});

export const ISearchStoreSchema = z.object({
  search: ISearchStorePropsSchema,
});

export type ISearchStoreProps = z.infer<typeof ISearchStoreSchema>;
