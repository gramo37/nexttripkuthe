const { Pool } = require("pg");

export const pool = new Pool({
    user: "postgres",
    password: "Pass@123",
    host: "localhost",
    port: 5432,
    database: "postgres"
});

export const executeQuery = async (statement:any, bindings?:any) => {
    try {
        const res = await pool.query(statement, bindings)
        return res.rows;
    } catch (error) {
        console.log(error);
    }
}

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
