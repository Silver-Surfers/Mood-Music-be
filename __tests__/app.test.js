const request = require('supertest');
const app = require('../lib/app');

describe('Mood-Music-be routes', () => {
  it('redirects user with token to front page', async() => {
    const response = await request(app)
      .get('/login');

    expect(response.body).toEqual(expect.any(Object));
  });
  

});
