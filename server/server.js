// import express from "express"
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const cors = require('cors');

// Sample user data (replace this with your database integration)
let userData = require('../react-social-cards-tutorial-master/src/Data.json');
app.use(cors());
app.use(bodyParser.json());


// GET /api/users 
app.get('/api/users', (req, res) => {
  res.json({
    data: userData,
    totalUsers: userData.length,
  });
});


// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = userData.find((user) => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// POST /api/users
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser.id = (Math.random() * 1000).toString(); // Replace with a proper ID generation logic

  userData.push(newUser);

  res.json(newUser);
});

// PUT /api/users/:id
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  const index = userData.findIndex((user) => user.id === userId);

  if (index !== -1) {
    userData[index] = { ...userData[index], ...updatedUserData };
    res.json(userData[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log(req.params.id);
  userData = userData.filter((user) => user.id !== userId);

  res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
