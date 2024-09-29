import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../redux/gameSlice';
import { useNavigate } from 'react-router-dom';

const GameStart = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (username) {
      dispatch(startGame(username));
      setIsGameStarted(true);
    }
  };

  const handleDrawCard = () => {
    navigate('/game/cardDraw');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 p-4 sm:p-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-lg text-center">
        Start Your Game
      </h1>
      {username ? (
        <p className="text-lg sm:text-xl text-white mb-4 drop-shadow-md text-center">
          Welcome, <span className="font-semibold">{username}!</span>
        </p>
      ) : (
        <p className="text-lg sm:text-xl text-white mb-4 drop-shadow-md text-center">
          Please log in to play.
        </p>
      )}

      {!isGameStarted ? (
        <button
          onClick={handleStartGame}
          className={`mt-6 px-6 sm:px-8 py-2 sm:py-3 text-lg font-semibold rounded-lg shadow-lg transition duration-300 ${
            username
              ? 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          disabled={!username}
        >
          Start Game
        </button>
      ) : (
        <button
          onClick={handleDrawCard}
          className="mt-6 px-6 sm:px-8 py-2 sm:py-3 text-lg font-semibold bg-white text-blue-600 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Draw Card
        </button>
      )}
      
      <footer className="mt-8">
        <p className="text-sm text-white opacity-75 text-center">
          &copy; {new Date().getFullYear()} Your Game Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default GameStart;
