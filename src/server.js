const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5002;

const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://admin:Asdf1234@bestmoviesdb-database.kmj8xwa.mongodb.net/?retryWrites=true&w=majority'; //Setup DB and add URI here

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use(express.static('build'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  //database
  mongoose.connect(dbURI, {})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));