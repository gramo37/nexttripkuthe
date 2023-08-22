// src/index.ts
import express from "express";
import { injectRoutes } from "./routes";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

injectRoutes(app);
