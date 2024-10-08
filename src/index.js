const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./db');
const User = require('./user'); 

const app = express();
app.use(express.json());

connectDB();

app.post('/createuser', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});