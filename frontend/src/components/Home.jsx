import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-lg text-center">
        Welcome to the Game!
      </h1>
      {!username ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-lg text-gray-700 mb-4">
            You need to create a user to start playing.
          </p>
          <Link to="/create-user">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Create User
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-lg text-gray-700 mb-4">
            Hello, <span className="font-semibold">{username}!</span>
          </p>
          <Link to="/game">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
              Start Game
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
