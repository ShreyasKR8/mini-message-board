const { Pool } = require("pg");
// require("dotenv").config();

// Again, this should be read from an environment variable
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
  }
  });
  
  // module.exports = new Pool({
  //   host: process.env.PGHOST, // or wherever the db is hosted
  //   user: process.env.PGUSER,
  //   database: process.env.PGDATABASE,
  //   password: process.env.PGPASSWORD,
  //   port: process.env.PGPORT
  // });