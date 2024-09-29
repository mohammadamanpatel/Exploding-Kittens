import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosInstance';

// Retrieve username from localStorage if available
const savedUsername = localStorage.getItem('username');

// Async thunk to handle user registration
export const registerUser = createAsyncThunk('user/createUser', async (username) => {
  console.log("username in the slice", username);
  
  // Adjusted endpoint to match the backend route
  const response = await axiosInstance.post('/create-user', { username });
  console.log("response", response);
  return response.data; // Ensure that the response format is as expected
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: savedUsername || null, // Set username from localStorage if available
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload; // Set the username from registration
      localStorage.setItem('username', action.payload); // Save to localStorage
    },
    logout(state) {
      state.username = null; // Clear username on logout
      localStorage.removeItem('username'); // Remove from localStorage
    },
  },
  extraReducers: (builder) => {
    // Handle user registration
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.username = action.payload.username; // Set the registered username
        localStorage.setItem('username', action.payload.username); // Save to localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Set error message if registration fails
      });
  },
});

export const { setUsername, logout } = userSlice.actions;
export default userSlice.reducer;
