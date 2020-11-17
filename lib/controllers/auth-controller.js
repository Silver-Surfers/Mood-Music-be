const { Router } = require('express');
// const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
// const cors = require('cors');
const querystring = require('querystring');
// const cookieParser = require('cookie-parser');

const client_id = '8e9cdadc85de4fbaad64c0b9558dadb5'; // Your client id
const client_secret = 'c9cd1d8edc96413c972022b501e7d71a'; // Your secret
const redirect_uri = 'http://localhost:7891/auth'; // Your redirect uri

// const stateKey = 'spotify_auth_state';

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`);
  })

  .get('/callback', (req, res) => {

    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;

  
    // res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
      },
      json: true
    }


      .post(authOptions, (error, response, body) => {
        if(!error && response.statusCode === 200) {

          const access_token = body.access_token,
            refresh_token = body.refresh_token;

          // oAuth ends here 

          const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          request.get(options, (error, response, body) => {
            console.log(body);
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect('/#' +
          querystring.stringify({
            access_token,
            refresh_token
          }));
        } else {
          res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
        }
      });
  });
