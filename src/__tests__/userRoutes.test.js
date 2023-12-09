const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes');
const reviewRoutes = require('../routes/reviewRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/review', reviewRoutes);


beforeAll(async () => {
   await mongoose.connect("mongodb+srv://admin:Asdf1234@bestmoviesdb-database.kmj8xwa.mongodb.net/?retryWrites=true&w=majority"
   , { useNewUrlParser: true, useUnifiedTopology: true });
},100000);
  
afterAll(async () => {
   await mongoose.disconnect();
});


describe('User Routes', () => {
  let token = '';
  const movieId = '775244';

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
    token = res.body.token;
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('token');
    expect(res.body.message).toBe("Login successful");
  },10000);

  it('should add a movie to the watchlist', async () => {
    const res = await request(app)
      .post(`/user/watchlist`)
      .send({ movieId: movieId})
      .set('Authorization', `Bearer ${token}`) 
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Movie added to watchlist');
  });

  it('should check if the movie is in the watchlist', async () => {
    const res = await request(app)
      .get(`/user/watchlist/${movieId}`)
      .set('Authorization', `Bearer ${token}`) 
      .expect(200);

    expect(res.body).toHaveProperty('inWatchList');
    expect(res.body.inWatchList).toBe(true);
  });

  it('should remove a movie from the watchlist', async () => {
    const res = await request(app)
      .delete(`/user/watchlist`)
      .send({ movieId: movieId})
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Movie removed from watchlist');
  });

  it('should check if the movie is in the watchlist', async () => {
    const res = await request(app)
      .get(`/user/watchlist/${movieId}`)
      .set('Authorization', `Bearer ${token}`) 
      .expect(200);

    expect(res.body).toHaveProperty('inWatchList');
    expect(res.body.inWatchList).toBe(false);
  });

});


//review routes
describe('Review Routes', () => {
  let token = '';
  const movieId = '775244';

  it('should log in a user', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ username: 'admin', password: 'admin' })
      .expect('Content-Type', /json/)
      .expect(200);
    token = res.body.token;
  },10000);

  it('should add a review', async () => {
    const res = await request(app)
      .post('/review')
      .set('Authorization', `Bearer ${token}`)
      .send({ movieId: movieId, content: 'Great movie!', rating: 5})
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Review added');
  });

  it('should get reviews for a movie', async () => {
    const res = await request(app)
      .get(`/review/${movieId}`)
      .expect(200);

    expect(res.body).toHaveProperty('reviews');
    expect(Array.isArray(res.body.reviews)).toBe(true);
  });

  it('should delete a review', async () => {
    const res = await request(app)
      .delete(`/review/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Review deleted');
  });
});