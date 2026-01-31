#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
INSERT INTO messages (user_name, message, sent_date) 
VALUES
  ('Amanda', Hi there!, new Date()),
  ('Charles', Hello, new Date())
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: 
    `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
