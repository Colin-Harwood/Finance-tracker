// server.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

app.use(express.json()); // Add this line
app.use(express.urlencoded({ extended: true })); // And this line

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

// User model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
  const User = mongoose.model('User', UserSchema);

mongoose.connect('mongodb+srv://new-user1:smalldog@cluster0.mifns0g.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

//Passport local strategy set up
passport.use(new LocalStrategy(
    async function(username, password, done) {
      try {
        const user = await User.findOne({ username: username });
        if (!user) { return done(null, false); }
  
        bcrypt.compare(password, user.password, function(err, res) {
          if(err) return done(err);
          if(res === false) return done(null, false);
          
          return done(null, user);
        });
      } catch (err) {
        return done(err);
      }
    }
  ));

//Passport session management set up
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Create login route
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        // Authentication failed
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // Log the user in
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
  
        // Authentication succeeded
        return res.status(200).json({ message: 'Authentication succeeded', user });
      });
    })(req, res, next);
  });

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Create signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
    // Hash the password
    bcrypt.hash(password, 10)
      .then(hash => {
        // Create a new user
        const user = new User({
          username: username,
          password: hash
        });
  
        // Save the new user to the database
        return user.save();
      })
      .then(user => {
        res.status(200).json({ message: 'User created', user });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });