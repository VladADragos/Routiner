/*
server.js serves as the entry file for the server
*/

const express = require('express');
const path = require('path');

const connectDB = require('./config/db');

const users = require('./routes/users');
const auth = require('./routes/auth');
const routines = require('./routes/routines');
const activities = require('./routes/activities');

// initializes express app
const app = express();

// connects to database
connectDB();

// middleware, prevously body-parser
app.use(express.json({ extended: false }));

// root endpoint
// app.get('/', async (req, res) => {
//   res.send('routiner root endpoint');
// });

// routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/routines', routines);
app.use('/api/activities', activities);

if (process.env.NODE_DEV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'cleint', 'build', 'index.html'))
  );
}

// uses env port when deployed, otherwise 5000
const PORT = process.env.PORT || 5000;

// sets ports & starts server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
