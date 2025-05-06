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
