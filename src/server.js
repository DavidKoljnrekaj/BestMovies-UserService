const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost','http://34.88.171.134:3000'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

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