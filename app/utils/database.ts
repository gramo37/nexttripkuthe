const Pool = require("pg").Pool;

export const pool = new Pool({
    user: "postgres",
    password: "Pass@123",
    host: "localhost",
    port: 5432,
    database: "postgres"
});

