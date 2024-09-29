import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance.js";

// Retrieve saved game state from localStorage
const savedGameState = JSON.parse(localStorage.getItem("gameState")) || {
  points: 0,
  gameWins: 0, // Ensure default value is set here
  message: "",
  deck: [],
  drawnCard: null,
  defuseCardCount: 0,
};

// Async thunk for starting a new game
export const startGame = createAsyncThunk(
  "user/startGame",
  async (username) => {
    const response = await axiosInstance.post(`/start-game/${username}`);
    return {
      deck: response.data.deck,
      message: response.data.message,
      points: 0, // Assuming points should reset to 0 at game start
    };
  }
);

// Async thunk for drawing a card
export const drawCard = createAsyncThunk("user/drawCard", async (username) => {
  const response = await axiosInstance.post(`/draw-card/${username}`);
  return {
    deck: response.data.deck,
    drawnCard: response.data.drawnCard,
    defuseCardCount: response.data.defuseCardCount,
    message: response.data.message,
    points: response.data.points,
  };
});

// Async thunk to fetch leaderboard data

const gameSlice = createSlice({
  name: "game",
  initialState: {
    points: savedGameState.points,
    gameWins: savedGameState.gameWins,
    message: savedGameState.message,
    deck: savedGameState.deck,
    drawnCard: savedGameState.drawnCard,
    defuseCardCount: savedGameState.defuseCardCount,
    loading: false,
    error: null,
  },
  reducers: {
    resetGame(state) {
      state.points = 0;
      state.message = "";
      state.deck = [];
      state.drawnCard = null;
      state.defuseCardCount = 0;
      localStorage.removeItem("gameState");
    },
    incrementGameWins(state) {
      state.gameWins += 1; // Increment game wins
      // console.log(
      //   "state.gameWins after incrementGameWins called",
      //   state.gameWins
      // );

      // Save updated game state to localStorage
      localStorage.setItem("gameState", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGame.fulfilled, (state, action) => {
        // console.log("state, action", state, action);
        state.points = action.payload.points; // Ensure points are initialized properly
        state.message = action.payload.message;
        state.deck = action.payload.deck;
        state.drawnCard = null;
        state.defuseCardCount = 0;

        // Save updated game state to localStorage
        localStorage.setItem("gameState", JSON.stringify(state));
      })
      .addCase(drawCard.fulfilled, (state, action) => {
        console.log("state, action in drawcard.fulfilled", state, action);
        state.deck = action.payload.deck;
        state.drawnCard = action.payload.drawnCard;
        state.message = action.payload.message;
        state.points = action.payload.points;
        state.defuseCardCount = action.payload.defuseCardCount;

        // Save updated game state to localStorage
        localStorage.setItem("gameState", JSON.stringify(state));
      });
  },
});

export const { resetGame, incrementGameWins } = gameSlice.actions;
export default gameSlice.reducer;
