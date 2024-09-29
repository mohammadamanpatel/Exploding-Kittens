// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameSlice.js";
import userReducer from "./UserSlice.js";

const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
});

export default store;
