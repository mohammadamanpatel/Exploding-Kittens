import React from 'react';
import { useSelector } from 'react-redux';

const Leaderboard = () => {
  // Extract username and gameWins from the game slice
  const {username} = useSelector((state)=>state.user)
  const {gameWins } = useSelector((state) => state.game);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Username</th>
            <th className="px-4 py-2 text-left text-gray-600">Games Won</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Check if username and gameWins are available */}
          {username && gameWins !== undefined ? (
            <tr>
              <td className="px-4 py-2 text-gray-800">{username}</td>
              <td className="px-4 py-2 text-gray-800">{gameWins}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="2" className="px-4 py-2 text-gray-600 text-center">
                No leaderboard data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
