// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Usercreate";
import { Game } from "./components/Game";
import GameStart from "./components/GameStart";
import DrawCard from "./components/DrawCard";
import Leaderboard from "./components/LeaderBoard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-user" element={<Registration />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game/start" element={<GameStart />} />
          <Route path="/game/cardDraw" element={<DrawCard />} />
          <Route path="/game/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
