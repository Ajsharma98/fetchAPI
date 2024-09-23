require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/booksRoutes');
const userRoutes = require('./routes/loginRoutes');
const app = express();
const cookieParser = require('cookie-parser'); // Optional for cookies if needed

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Optional, based on your need for handling cookies

// Enable CORS and JSON parsing
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true
}));
app.use(express.json());

// Use the book and user routes
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
