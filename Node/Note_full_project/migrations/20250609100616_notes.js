/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.string("title").notNullable();
    table.text("text");
    table.boolean("is_archived").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("notes");
};
