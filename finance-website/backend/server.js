// server.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cors = require('cors');


const allInfo = require('./models/AllInfo.js')

const app = express();

app.use(express.json()); // Add this line
app.use(express.urlencoded({ extended: true })); // And this line

app.use(session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'))



app.use(cors({
  origin: 'http://localhost:5173', // allow to server to accept request from different origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // allow session cookie from browser to pass through
}));
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

// Passport session management set up
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Then use ensureAuthenticated in your routes
app.get('/protected', ensureAuthenticated, function(req, res){
  res.send(`Hello, ${req.user.username}. You accessed the protected route.`);
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
        console.log('username', req.user)
        return res.status(200).json({ message: 'Authentication succeeded', user });
        
      });
    })(req, res, next);
  });

app.get('/dashboard', function(req, res){
  if(req.user){
    res.send('Welcome to your dashboard!', User.find());
  } else {
    res.send('Please log in first.', User.find(), 'check');
  }
});

app.get('/protected', function(req, res){
  if(req.user){
    res.send(`Hello, ${req.user.username}. You accessed the protected route.`);
  } else {
    res.status(401).send('Please log in to access this route.');
  }
});


  

// Apply Passport's authentication middleware to the '/' route
app.get('/', (req, res) => {
  // At this point, req.user should be available if authentication was successful
  if (req.user) {
    res.send(`Hello World, username: ${req.user}`);
  } else {
    // This block should not be reached if authentication was successful
    res.status(401).json({ message: 'Unauthorized' });
  }
});


// Create signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
    const userInfo = {
      userName: username,
      incomes: {},
      expenses: {},
      subscriptions: {},
      incomeGoal: 0,
    }

    const newUserInfo = new allInfo(userInfo);

    console.log(userInfo)

    newUserInfo.save()
      .then(savedUser => {
          console.log('User info saved:', userInfo);
      })
      .catch(error => {
          console.error('Error saving user:', error);
      });

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

app.get('/info', (req, res, next) => {
    // Check if a user is logged in
  
      const currentUsername = req.user.username;

      console.log(req.user)

      console.log('user', currentUsername)

      allInfo.findOne({ userName: currentUsername })
          .then(userInfo => {
              // Check if userInfo exists
              if (userInfo) {
                  // If userInfo exists, send it as the response
                  res.status(200).json(userInfo);
              } else {
                  // If userInfo does not exist, send a 404 response
                  res.status(404).json({ message: 'User info not found for ' + currentUsername });
              }
          })
          .catch(error => {
              // If an error occurs, send a 500 response with the error message
              console.error('Error querying user info:', error);
              res.status(500).json({ error: 'Internal server error' });
          });
   
    
});


app.post('/income', (req, res) => {
  const { incomeSource, amount } = req.body;
  const currentUsername = req.user.username;

  allInfo.findOneAndUpdate(
    { userName: currentUsername },
    { $push: { incomes: { source: incomeSource, amount: amount } } },
    { new: true } // This option returns the updated document
  )
  .then(updatedUser => {
    res.status(200).json(updatedUser);
  })
  .catch(error => {
    console.error('Error updating user income:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.delete('/income', (req, res) => {
  const { incomeSource, amount } = req.body;
  const currentUsername = req.user.username;

  allInfo.findOneAndUpdate(
    { userName: currentUsername },
    { $pull: { incomes: { source: incomeSource, amount: amount } } },
    { new: true } // This option returns the updated document
  )
  .then(updatedUser => {
    res.status(200).json(updatedUser);
  })
  .catch(error => {
    console.error('Error updating user income:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.put('/income', async (req, res) => {
  try {
    const { incomeSource, amount } = req.body;

    if (!incomeSource || !amount) {
      return res.status(400).json({ message: 'Income source and amount are required' });
    }

    // Use the authenticated user
    const user = await allInfo.findOne({ userName: req.user.username });
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the income item
    const itemIndex = user.incomes.findIndex(income => income.source.toLowerCase() === incomeSource.toLowerCase());
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Income item not found' });
    }

    // Update the item
    user.incomes[itemIndex].amount = amount;

    // Mark the incomes field as modified
    user.markModified('incomes');

    // Save the user
    await user.save();

    res.json({ message: 'Income item updated successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/income', (req, res) => {
  res.send(req.user)
})