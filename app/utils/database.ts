const { Pool } = require("pg");

export const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
});

export const executeQuery = async (statement: any, bindings?: any) => {
  try {
    const res = await pool.query(statement, bindings);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export const initdb = () => {
  pool
    .connect()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err: any) => {
      console.error("Error connecting to the database:", err);
    });
};

// export const client = new Client({
//   connectionString:
//     "postgresql://doadmin:AVNS_1VS0CJfTPo8qGsS9izS@nexttripkuthe-do-user-9474677-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// export const client = new Client({
//     user: "doadmin",
//     password: "AVNS_1VS0CJfTPo8qGsS9izS",
//     host: "nexttripkuthe-do-user-9474677-0.b.db.ondigitalocean.com",
//     port: 25060,
//     database: "defaultdb"
// });
