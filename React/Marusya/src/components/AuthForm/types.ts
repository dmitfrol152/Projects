import { z } from "zod";

export const IAuthFormVisibleSchema = z.object({
  authFormVisible: z.boolean(),
});

export const IAuthFormVisibleStoreSchema = z.object({
  authFormVisible: IAuthFormVisibleSchema,
});

export type IAuthFormVisibleStoreProps = z.infer<
  typeof IAuthFormVisibleStoreSchema
>;

export const IAuthTypeSchema = z.object({
  authType: z.string(),
});

export const IAuthTypeStoreSchema = z.object({
  authType: IAuthTypeSchema,
});

export type IAuthTypeStoreProps = z.infer<typeof IAuthTypeStoreSchema>;
