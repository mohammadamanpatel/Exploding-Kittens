import { client } from "../config/redis.connect.js";

// Increment user points
export const incrementPoints = async (username) => {
  const points = await client.get(`${username}:points`);
  if (points) {
    await client.set(`${username}:points`, parseInt(points) + 1); // Increment points
  }
};

// Get user points
export const getUserPoints = async (username) => {
  const points = await client.get(`${username}:points`);
  return parseInt(points) || 0; // Return points or 0 if not found
};

// Update user points
export const updateUserPoints = async (username, points) => {
  await client.set(`${username}:points`, points); // Update points in the database
};


// Restart game for user
export const restartGame = async (username) => {
  await client.set(`${username}`, 0); // Reset points to zero
  // Additional logic to reset game state can go here
};
