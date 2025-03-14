require('dotenv').config();
const express = require('express');

// Instantiate an express server:
const app = express();

// Use process.env.PORT if it exists, otherwise use 5001:
const PORT = process.env.PORT || 5001;

// Require auth-related middleware:
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Require router files:
const userRouter = require('./routes/user.router');
const logRouter = require('./routes/log.router');
const progressionRouter = require('./routes/progression.router');
const routinesRouter = require('./routes/routines.router');
// Apply middleware:
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Apply router files:
app.use('/api/user', userRouter);
app.use('/api/log', logRouter);
app.use('/api/progression', progressionRouter);
app.use('/api/routines', routinesRouter);
// Start the server:
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
