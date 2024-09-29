
import express from "express";
import { config } from "dotenv";
config();
import userRoutes from "./routes/game.routes.js";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
app.use("/api/game", userRoutes);
