const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

const dbURI = ''; //Setup DB and add URI here

app.use('/user', userRoutes);
app.use(express.static('build'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  //database
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
  });
  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });