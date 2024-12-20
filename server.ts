import express, { Express, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;

const app: Express = express();
app.use(express.json());

app.get("/gasPrices", async (_, res: Response) => {
  try {
    const response = await fetch(ETHERSCAN_API_URL);
    const data = await response.json();

    if (data.status === "1") {
      res.json({
        success: true,
        gasPrices: {
          low: data.result.SafeGasPrice,
          average: data.result.ProposeGasPrice,
          high: data.result.FastGasPrice,
        },
      });
    } else {
      res.status(500).json({ success: false, error: data.message });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

export default app;
