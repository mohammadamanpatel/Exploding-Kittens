import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { registerUser } from "../redux/UserSlice";

const Registration = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(registerUser(username)); // Dispatch the registerUser action with the username
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full py-2 px-4 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              status === "loading"
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Handle success and error states */}
        {status === "succeeded" && (
          <p className="mt-4 text-green-600 text-center">
            Registration successful! Welcome, {username}!
          </p>
        )}
        {status === "failed" && (
          <p className="mt-4 text-red-600 text-center">Error: {error}</p>
        )}

        {/* Back to Home button */}
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="mt-4 w-full py-2 px-4 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Registration;
