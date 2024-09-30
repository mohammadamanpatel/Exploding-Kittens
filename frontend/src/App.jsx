// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy-loaded components
const Home = lazy(() => import("./components/Home"));
const Registration = lazy(() => import("./components/Usercreate"));
import {Game} from "./components/Game"
import GameStart from "./components/GameStart";
import DrawCard from "./components/DrawCard";
import Leaderboard from "./components/LeaderBoard";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Wrap routes inside Suspense */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="flex items-center justify-center">
                <div className="loader"></div>
              </div>
              <style jsx>{`
                .loader {
                  border: 16px solid #f3f3f3; /* Light grey */
                  border-top: 16px solid #3498db; /* Blue */
                  border-radius: 50%;
                  width: 80px;
                  height: 80px;
                  animation: spin 2s linear infinite;
                }

                @keyframes spin {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
              `}</style>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-user" element={<Registration />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game/start" element={<GameStart />} />
            <Route path="/game/cardDraw" element={<DrawCard />} />
            <Route path="/game/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
