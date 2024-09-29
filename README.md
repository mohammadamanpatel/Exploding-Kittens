# Emitrr Assignment

A simple card game application built using the MERN stack and Vite for the frontend. This project allows users to create accounts, start a game, and draw cards. It utilizes Redux for state management, Redis for database, and is styled using Tailwind CSS for a responsive and modern look.

Features

- User registration and login
- Start a game
- Draw cards during the game
- Responsive design for mobile and desktop
- Modern UI with Tailwind CSS

Technologies

This project is built with the following technologies:

- Frontend:
  - React
  - Vite
  - Redux Toolkit
  - Tailwind CSS

- Backend:
  - Node.js
  - Express
  - Redis
  
Video Proof:-👉
https://drive.google.com/file/d/1YwtxcleCZSunXXaivZl7qFulXTe67P3g/view?usp=sharing

Live Link:-👉
https://exploding-kittens-v513.onrender.com

Installation:-

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/mohammadamanpatel/Exploding-Kittens.git
   ```

2. Navigate to the project directory:
   ```bash
   cd emitrr-assignment
   ```

3. Install dependencies for both the frontend and backend:
   ```bash
   npm install
   ```

5. Start the development server for the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. (Optional) Start the backend server:
   ```bash
   npm run dev
   ```

Usage

1. Open your browser and navigate to `http://localhost:5173` to view the application.
2. Create a new user account or log in if you already have one.
3. Start a new game and draw cards to play.

Folder Structure

Here’s a brief overview of the project folder structure:

```
emitrr-assignment/
│
├── frontend/                   Frontend application (React)
│   ├── dist/                   Compiled production files
│   ├── node_modules/           Project dependencies
│   ├── public/                 Static files
│   ├── src/                    Source files for the React application
│   │   ├── components/         Reusable React components
│   │   │   ├── DrawCard.jsx       Component for drawing a card
│   │   │   ├── Game.jsx           Component for the game logic
│   │   │   ├── GameStart.jsx      Component for starting the game
│   │   │   ├── Home.jsx           Home page component
│   │   │   ├── LeaderBoard.jsx     Component for displaying the leaderboard
│   │   │   └── Usercreate.jsx      Component for user creation
│   │   ├── redux/              Redux state management
│   │   │   ├── GameSlice.js       Slice for managing game state
│   │   │   ├── UserSlice.js       Slice for managing user state
│   │   │   └── store.js           Redux store configuration
│   │   ├── config/             Configuration files for the frontend
│   │   │   └── axiosInstance.js  Axios instance for API requests
│   │   ├── app.jsx             Main application component
│   │   ├── main.js             Entry point for the React application
│   ├── package.json            Project metadata and dependencies
│   ├── package-lock.json       Lock file for exact dependency versions
│   └── vite.config.js          Vite configuration
│
├── server/                     Backend application
│   ├── config/                 Configuration files
│   │   └── redis.connect.js     Configuration for Redis connection
│   ├── controllers/            Request handlers for routes
│   ├── routes/                 API route definitions
│   ├── utils/                  Utility functions and helpers
│   │   └── deck.create.js      Utility for creating a deck of cards
│   └── server.js               Entry point for the backend server
├── .env                        Environment variables for the project
├── .gitignore                  Files and directories to be ignored by Git
└── README.md                   Project documentation
```

Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to create a pull request or open an issue.

1. Fork the project
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
