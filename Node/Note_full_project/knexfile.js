import dotenv from "dotenv";
dotenv.config();

const config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  migrations: {
    tableName: "knex_migrations",
  },
  pool: {
    min: 0,
    max: 7,
    createTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
  }
};

console.log('Database URL:', process.env.DATABASE_URL);

export default config;
