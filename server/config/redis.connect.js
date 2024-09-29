import { createClient } from "redis";
import { config } from "dotenv";

config();

export const client = createClient({
  password: process.env.REDIS_PASSWORD, // Use this only if your Redis instance has a password
  socket: {
    host: process.env.REDIS_HOST, // Make sure this is correct
    port: Number(process.env.REDIS_PORT), // Ensure this is a number
  },
});

(async () => {
  try {
    await client.connect(); 
    console.log("Connected to Redis successfully");
  } catch (err) {
    console.error("Error connecting to Redis:", err); 
  }
})();

client.on("error", (err) => {
  console.error("Redis connection error:", err); 
});
