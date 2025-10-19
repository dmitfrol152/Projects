import z from "zod";
import { ProductSchema } from "./productType";
import { PaginationSchema } from "./paginationType";
import { CategoriesSchema } from "./categoriesType";
import { FastSchema } from "./fastStringType";
import { ActionsSchema } from "./actionsType";

export const DataSchema = z.object({
  categories: z.array(CategoriesSchema),
  pagination: PaginationSchema,
  id_mark_for_sale: z.number(),
  products: z.array(ProductSchema),

  special_project_parameters_json: FastSchema,
  special_project_parameters_actions: z.array(ActionsSchema),
});

export type DataProps = z.infer<typeof DataSchema>;
