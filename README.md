# Number-Guessing-Game_using_ReactJS-ExpressJS-MongoDB
# Number Guessing Game

A simple web application for playing the number guessing game. Guess the correct number with the fewest guesses for the best score and enjoy the game!

## Project Structure

- `frontend/`: React.js code for the frontend
 
- `server/`: ExpressJS code for the backend


## Setup and Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/BalajiDyavanpalli7030/Number-Guessing-Game_using_ReactJS-ExpressJS-MongoDB.git

2. Navigate to the project folder:
   ```bash
   cd Number-Guessing-Game_using_ReactJS-ExpressJS-MongoDB

## Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```
## Install backend dependencies
   ```bash
   cd ../server
   npm install
   ```
3. Run the application:

## Start the frontend
   ```bash
   cd ../frontend
   npm start
   ```
## Start the backend
   ```bash
   cd ../server
  ```
   create .env file and details
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/game_db
   ACCESS_TOKEN_SECERET=your$ecretKey
   ```
   ```bash
   npm run dev
   ```
Visit http://localhost:3000 in your browser to play the game.

## Technologies Used

- React.js for the frontend (utilizing JSX for component structure)
- CSS for styling
- ExpressJS for the backend
- MongoDB for data storage

## Authentication and Game History

- **Authentication System:** Secure user authentication is implemented using JWT tokens, allowing users to register, log in, and access protected routes within the application.
- **Middleware:** Various middleware functions are utilized to handle cross-cutting concerns such as CORS, body parsing, request logging, and error handling, improving the application's modularity and maintainability.
- **User Game History:** The application stores user game history.

## Deployment

The Number Guessing Game is deployed on Netlify. You can play it live at [https://0numberguessinggame.netlify.app/].

## Contact

For any inquiries or feedback, feel free to contact me at balajidyavanpalli@gmail.com.
