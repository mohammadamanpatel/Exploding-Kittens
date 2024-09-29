import React from "react";
import GameStart from "./GameStart";
import Leaderboard from "./LeaderBoard";

export const Game = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg mb-8 p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome to the Game!</h2>
        <GameStart />
      </div>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Leaderboard</h2>
        <Leaderboard />
      </div>
    </div>
  );
};
