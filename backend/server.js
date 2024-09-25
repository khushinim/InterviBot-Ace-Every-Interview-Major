// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS for frontend-backend communication
app.use(express.json());  // Parse incoming JSON data

// Session middleware (used for OAuth sessions)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',  // Store a secret in the environment variables
  resave: false,
  saveUninitialized: false,
}));

// Initialize passport and manage sessions
app.use(passport.initialize());
app.use(passport.session());  // Persistent login sessions

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Passport Serialize/Deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);  // Save only the user ID in the session
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);  // Attach the user object to req.user
  });
});

// Import and use OAuth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
