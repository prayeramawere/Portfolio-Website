const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "portfolioamo",
  password: "your_password",
});

await client.connect();
