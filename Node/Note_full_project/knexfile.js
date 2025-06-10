import dotenv from "dotenv";
dotenv.config();

export default {
  client: "pg",
  connection: process.env.DB_CONNECTIONSTRING,
  migrations: {
    tableName: "knex_migrations",
  },
};
