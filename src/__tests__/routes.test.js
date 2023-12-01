const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);


beforeAll(async () => {
   await mongoose.connect("mongodb+srv://admin:Asdf1234@bestmoviesdb-database.kmj8xwa.mongodb.net/?retryWrites=true&w=majority"
   , { useNewUrlParser: true, useUnifiedTopology: true });
});
  
afterAll(async () => {
   await mongoose.disconnect();
});


describe('User Routes', () => {
  it('should sign up a user', async () => {
    const res = await request(app)
      .post('/user/signup')
      .send({ username: 'admin', password: 'admin' })
      .expect('Content-Type', /html/)
      .expect(500);
  },100000);

  it('should log in a user', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ username: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe("Login successful");
  },10000);
});