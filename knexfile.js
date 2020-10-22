// Update with your config settings.
const pgConnection = process.env.DATABASE_URL;
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      database: 'tempbackend',
      user: "postgres",
      password: 'marctapp'
    },
    migrations: { directory: "./data/migrations" },
  },
  production: {
    client: "postgresql",
    connection: pgConnection,
    migrations: { directory: "./data/migrations" },
  },
};
