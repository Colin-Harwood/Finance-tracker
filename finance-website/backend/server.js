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

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
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

    const existingUser = User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    const userInfo = {
      userName: username,
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
  const { incomeSource, amount, month, year } = req.body;
  const currentUsername = req.user.username;

  if (!incomeSource || !amount || !month || !year) {
    return res.status(400).json({ message: 'income source and amount are required' });
  }

  console.log('month year', month, year)
  allInfo.findOneAndUpdate(
    { userName: currentUsername },
    { $push: { incomes: { source: incomeSource, amount: amount, month: month, year: year } } },
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
  const { incomeSource, amount, month, year } = req.body;
  const currentUsername = req.user.username;

  allInfo.findOneAndUpdate(
    { userName: currentUsername },
    { $pull: { incomes: { source: incomeSource, amount: amount, month: month, year: year } } },
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
    const { incomeSource, amount, month, year } = req.body;

    if (!incomeSource || !amount || !month || !year) {
      return res.status(400).json({ message: 'Income source and amount are required' });
    }

    // Use the authenticated user
    const user = await allInfo.findOne({ userName: req.user.username });
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the income item
    const itemIndex = user.incomes.findIndex(income => income.source === incomeSource && income.month === month && income.year === year);
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

app.post('/expense', (req, res) => {
  const { expenseSource, amount, month, year } = req.body;
  const currentUsername = req.user.username;

  if (!expenseSource || !amount || !month || !year) {
    return res.status(400).json({ message: 'expense source and amount are required' });
  }

  console.log('month year', month, year)
  allInfo.findOneAndUpdate(
    { userName: currentUsername },
    { $push: { expenses: { source: expenseSource, amount: amount, month: month, year: year } } },
    { new: true } // This option returns the updated document
  )
  .then(updatedUser => {
    res.status(200).json(updatedUser);
  })
  .catch(error => {
    console.error('Error updating user expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.delete('/expense', (req, res) => {
  const { expenseSource, amount, month, year } = req.body;
  const currentUsername = req.user.username;

  allInfo.findOneAndUpdate(
    { userName: currentUsername },
    { $pull: { expenses: { source: expenseSource, amount: amount, month: month, year: year } } },
    { new: true } // This option returns the updated document
  )
  .then(updatedUser => {
    res.status(200).json(updatedUser);
  })
  .catch(error => {
    console.error('Error updating user expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.put('/expense', async (req, res) => {
  try {
    const { expenseSource, amount, month, year } = req.body;

    console.log('expense source', expenseSource)
    console.log('amount', amount)
    console.log('month', month)
    console.log('year', year)

    if (!expenseSource || !amount || !month || !year) {
      return res.status(400).json({ message: 'expense source and amount are required' });
    }

    // Use the authenticated user
    const user = await allInfo.findOne({ userName: req.user.username });
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the expense item
    const itemIndex = user.expenses.findIndex(expense => expense.source === expenseSource && expense.month === month && expense.year === year);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'expense item not found' });
    }

    // Update the item
    user.expenses[itemIndex].amount = amount;

    // Mark the expenses field as modified
    user.markModified('expenses');

    // Save the user
    await user.save();

    res.json({ message: 'expense item updated successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/incomeGoal', async (req, res) => {
  const { incomeGoal } = req.body;
  const currentUsername = req.user.username;

  // Find the income goal document and update it
  // This assumes there's only one income goal document in the database
  const result = await allInfo.findOneAndUpdate({ userName: currentUsername }, { incomeGoal: incomeGoal }, { new: true });

  if (result) {
    res.json({ success: true, message: 'Income goal updated successfully' });
  } else {
    res.json({ success: false, message: 'Failed to update income goal' });
  }
});

app.post('/subscription', (req, res) => {
  const { subscriptionSource, amount} = req.body;
  const currentUsername = req.user.username;

  if (!subscriptionSource || !amount) {
    return res.status(400).json({ message: 'subscription source and amount are required' });
  }

  allInfo.findOneAndUpdate(
    { userName: currentUsername },
    { $push: { subscriptions: { source: subscriptionSource, amount: amount} } },
    { new: true } // This option returns the updated document
  )
  .then(updatedUser => {
    res.status(200).json(updatedUser);
  })
  .catch(error => {
    console.error('Error updating user subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.delete('/subscription', (req, res) => {
  const { source, amount} = req.body;
  const currentUsername = req.user.username;
  console.log('subscription source', source)

  allInfo.findOneAndUpdate(
    { userName: currentUsername },
    { $pull: { subscriptions: { source: source, amount: amount } } },
    { new: true } // This option returns the updated document
  )
  .then(updatedUser => {
    res.status(200).json(updatedUser);
  })
  .catch(error => {
    console.error('Error updating user subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.put('/subscription', async (req, res) => {
  try {
    const { subscriptionSource, amount} = req.body;

    console.log('subscription source', subscriptionSource)
    console.log('amount', amount)

    if (!subscriptionSource || !amount) {
      return res.status(400).json({ message: 'subscription source and amount are required' });
    }

    // Use the authenticated user
    const user = await allInfo.findOne({ userName: req.user.username });
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the subscription item
    const itemIndex = user.subscriptions.findIndex(subscription => subscription.source === subscriptionSource);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'subscription item not found' });
    }

    // Update the item
    user.subscriptions[itemIndex].amount = amount;

    // Mark the subscriptions field as modified
    user.markModified('subscriptions');

    // Save the user
    await user.save();

    res.json({ message: 'subscription item updated successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    console.log('old password', oldPassword)
    console.log('new password', newPassword)
    console.log('req.user password', req.user.password)
    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    const isMatch = await bcrypt.compare(oldPassword, req.user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Use the authenticated user
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Hash the new password
    const hash = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hash;

    // Save the user
    await user.save();

    res.json({ message: 'Password updated successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/delete-account', async (req, res) => {
  try {
    const password = req.body.password;

    const isMatch = await bcrypt.compare(password, req.user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }
    // Use the authenticated user
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Delete the user
    await User.deleteOne({ username: req.user.username });

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});