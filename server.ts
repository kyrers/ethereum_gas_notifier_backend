import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
