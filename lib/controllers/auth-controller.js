const { Router } = require('express');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

// const request = require('request'); // "Request" library
// const querystring = require('querystring');


module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`);
  })

  
  .get('/callback', (req, res) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', req.query.code);
    params.append('redirect_uri', process.env.REDIRECT_URI);
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'authorization' : `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`
      },
      body: params
    })
      .then(res => res.json())
      .then(json => {
        res.redirect(`${process.env.FRONTEND_URL}/webcam?token=${json.access_token}`);
      });

  });
