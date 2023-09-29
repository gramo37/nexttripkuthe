// src/index.ts
import express from "express";
import { injectRoutes } from "./routes";
import "dotenv/config";
import { initdb } from "./utils/database";
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

initdb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

injectRoutes(app);
