import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawCard, incrementGameWins, startGame } from "../redux/GameSlice";
import { useNavigate } from "react-router-dom";

const DrawCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deck, drawnCard, points, gameWins, defuseCardCount } = useSelector(
    (state) => state.game
  );
  const { username } = useSelector((state) => state.user);

  const [showWinMessage, setShowWinMessage] = useState(false);

  const handleDrawCard = () => {
    if (username) {
      if (deck.length === 0) {
        alert("Congrats! You've won the game!");
        dispatch(incrementGameWins()); // Increment game wins in Redux
        setShowWinMessage(true);
        setTimeout(() => {
          navigate("/"); // Navigate to home after a delay (optional)
        }, 2000); // Delay before navigating to give users time to see the message
        return;
      }
      dispatch(drawCard(username));
    }
  };

  useEffect(() => {
    if (drawnCard) {
      if (drawnCard.type === "exploding") {
        if (defuseCardCount > 0) {
          alert(
            `You defused the bomb! You have ${
              defuseCardCount - 1
            } defuse cards left.`
          );
        } else {
          alert("Boom! You drew an exploding kitten. Game over!");
          dispatch(startGame(username)); // Restart the game on losing
        }
      }
    }
  }, [drawnCard, defuseCardCount, dispatch, username]);

  const renderCardFeedback = () => {
    if (!drawnCard) return null;

    switch (drawnCard.type) {
      case "cat":
        return (
          <p className="mt-4 text-lg text-green-700">
            You drew a cat card! Points increased to {points}.
          </p>
        );
      case "exploding":
        return (
          <p className="mt-4 text-lg text-red-700">
            Boom! You drew an exploding kitten. Game over!
          </p>
        );
      case "defuse":
        return (
          <p className="mt-4 text-lg text-yellow-600">
            You drew a defuse card! You can defuse the next bomb.
          </p>
        );
      case "shuffle":
        return (
          <p className="mt-4 text-lg text-blue-600">
            You drew a shuffle card! The deck has been reshuffled.
          </p>
        );
      default:
        return null;
    }
  };

  const getCardImage = () => {
    return drawnCard ? drawnCard.emoji : ""; // Return the card image
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-green-300 to-blue-300 rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
        Draw a Card
      </h2>
      <p className="text-xl font-semibold text-white mb-2">Points: {points}</p>
      <p className="text-xl font-semibold text-white mb-4">
        Game Wins: {gameWins || 0}
      </p>

      <button
        onClick={handleDrawCard}
        className="px-8 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition duration-300"
        disabled={!username}
      >
        Draw Card
      </button>

      {drawnCard && (
        <div className="card-container flex justify-center mt-4">
          <div className="card border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105">
            <img
              src={getCardImage()}
              alt={drawnCard.type}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-center">
                {drawnCard.type.charAt(0).toUpperCase() + drawnCard.type.slice(1)}
              </h3>
              <p className="text-center text-gray-700">
                Type: {drawnCard.type}
              </p>
            </div>
          </div>
        </div>
      )}
      {renderCardFeedback()}

      {showWinMessage && (
        <div className="mt-4 text-5xl text-white animate-bounce">
          🎉 Congrats! You've won the game! 🎉
        </div>
      )}
    </div>
  );
};

export default DrawCard;
