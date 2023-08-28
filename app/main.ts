// src/index.ts
import express from "express";
import { injectRoutes } from "./routes";
import "dotenv/config";
import { pool } from "./utils/database";
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err: any) => {
    console.error("Error connecting to the database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

injectRoutes(app);
