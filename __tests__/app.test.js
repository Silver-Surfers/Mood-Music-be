const request = require('supertest');
const app = require('../lib/app');
// const Router = require('../lib/controllers/auth-controller');

describe('Mood-Music-be routes', () => {
  it('/login - fart fart test', async() => {
    const response = await request(app)
      .get('/login');

    expect(response.body).toEqual(expect.any(Object));
  });
});
