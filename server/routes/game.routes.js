import express from "express";
import { client } from "../config/redis.connect.js";
import {
  getUserPoints,
  incrementPoints,
  restartGame,
  updateUserPoints,
} from "../controllers/game.controller.js";
import createDeck from "../utils/deck.create.js";

const router = express.Router();

// Create user
router.post("/create-user", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.json({ message: "Enter username" });
  }

  const points = 0; // Initialize points to zero

  try {
    // Check if the username already exists in Redis
    const userExists = await client.exists(username);

    if (userExists) {
      // If the user exists, send a response indicating the user already exists
      return res.status(409).json({ message: "User already exists" });
    }

    // Store the username and points in Redis if the user doesn't exist
    await client.set(username, points);

    // Respond with the created username and points
    res.status(201).json({ username, points });
  } catch (err) {
    console.log("Error while creating user", err);
    res.status(500).send("Error creating user");
  }
});

// Increment user points
router.post("/increment-points", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    await incrementPoints(username); // Call controller function
    const updatedPoints = await getUserPoints(username);
    res.json({ username, points: updatedPoints });
  } catch (err) {
    res.status(500).send("Error incrementing points");
  }
});

// Restart game
router.post("/restart-game", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    await restartGame(username);
    res.json({ username, points: 0, message: "Game restarted successfully" }); // Respond with reset points
  } catch (err) {
    res.status(500).send("Error restarting game");
  }
});

// Get users
router.get("/get-users", async (req, res) => {
  try {
    const keys = await client.keys("*"); // Get all usernames
    const users = [];

    // Retrieve points for each user
    for (const key of keys) {
      const points = await client.get(key);
      users.push({ username: key, points: parseInt(points) });
    }

    // Sort users by points in descending order
    users.sort((a, b) => b.points - a.points);

    res.json(users);
  } catch (err) {
    res.status(500).send("Error retrieving leaderboard");
  }
});
router.post("/start-game/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Create a new deck for the user
    const newDeck = createDeck();
    await client.set(`${username}:deck`, JSON.stringify(newDeck)); // Store the deck in Redis

    // Reset user's points to zero
    await restartGame(username); // This function will set points to zero

    res.json({ message: "Game started successfully!", deck: newDeck });
  } catch (err) {
    res.status(500).send("Error starting game");
  }
});
// Draw Card Route
router.post("/draw-card/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const deckString = await client.get(`${username}:deck`);
    let deck = JSON.parse(deckString);

    // Check if the deck is empty after drawing a card
    if (deck.length === 0) {
      // Reset points and defuse card count
      points = 0;
      await updateUserPoints(username, points);
      defuseCardCount = 0;
      await client.set(`${username}:defuseCardCount`, defuseCardCount);

      // Send the success response
      res.json({
        message:
          "Congratulations! You've drawn all the cards and won the game!",
        points,
        defuseCardCount, // Send the reset defuse card count
      });
    } else {
      console.log("Deck is not empty, length:", deck.length);
    }

    // Proceed with drawing the card and handling the game logic
    const drawnCard = deck.pop(); // Draw the last card from the deck

    // Ensure Redis is updated with the modified deck
    await client.set(`${username}:deck`, JSON.stringify(deck)); // Update the deck in Redis

    // Initialize user's points
    let points = await getUserPoints(username); // Get current points for the user

    // Get the number of defuse cards the user has
    let defuseCardCount =
      parseInt(await client.get(`${username}:defuseCardCount`), 10) || 0;

    // Handle card logic
    if (drawnCard.type === "exploding") {
      if (defuseCardCount > 0) {
        // If the user has defuse cards, use one
        defuseCardCount -= 1; // Use one defuse card
        await client.set(`${username}:defuseCardCount`, defuseCardCount); // Update defuse card count in Redis
        return res.json({
          message: `Boom! You drew an exploding kitten, but you defused it! You have ${defuseCardCount} defuse cards left.`,
          drawnCard,
          points,
          deck,
          defuseCardCount, // Send back updated defuse card count
        });
      } else {
        // If no defuse cards, game over
        points = 0;
        await updateUserPoints(username, points); // Update points in the database

        return res.json({
          message:
            "Boom! You drew an exploding kitten. Game over. Starting new game.",
          drawnCard,
          points,
          deck,
        });
      }
    } else if (drawnCard.type === "defuse") {
      // Player draws a defuse card; increment their defuse card count
      defuseCardCount += 1; // Add one defuse card
      await client.set(`${username}:defuseCardCount`, defuseCardCount); // Update defuse card count in Redis
      return res.json({
        message: `You drew a defuse card! You now have ${defuseCardCount} defuse cards.`,
        drawnCard,
        points, // Points remain unchanged
        deck,
        defuseCardCount, // Send back updated defuse card count
      });
    } else if (drawnCard.type === "shuffle") {
      // If a shuffle card is drawn, restart the game by reshuffling the deck
      points = 0; // Set points to zero and update the database
      await updateUserPoints(username, points); // Update points in the database
      const newDeck = createDeck(); // Reshuffle the deck with a new deck
      await client.set(`${username}:deck`, JSON.stringify(newDeck)); // Update the reshuffled deck in Redis

      return res.json({
        message:
          "You drew a shuffle card! The deck has been reshuffled. Game restarted.",
        drawnCard, // Send the reshuffled deck back to the user
        points,
        deck: newDeck,
      });
    } else {
      // If it's a cat card, increment points
      await incrementPoints(username); // Increment points for drawing a cat card
      points += 1; // Increase points by 1
      await updateUserPoints(username, points); // Update points in the database
      return res.json({
        message: "You drew a cat card! Points increased.",
        drawnCard,
        points,
        deck,
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).send("Error drawing card");
  }
});

// Restart Game Route (example)
router.post("/restart-game/:username", async (req, res) => {
  try {
    await restartGame(username); // Reset points to zero and any other game state
    const newDeck = createDeck(); // Create a new deck of cards
    await client.set(`${username}:deck`, JSON.stringify(newDeck)); // Set the new deck in Redis
    res.json({ message: "Game restarted successfully", newDeck });
  } catch (err) {
    res.status(500).send("Error restarting game");
  }
});

export default router;
