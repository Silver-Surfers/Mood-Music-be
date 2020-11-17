const { Router } = require('express');
const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const client_id = 'ae731d367d764f698af161bd2cc4d2b2'; // Your client id
const client_secret = 'bd1922334f3c4d56888e12f11b5a3a90'; // Your secret
const redirect_uri = 'http://localhost:8888/callback/'; // Your redirect uri

const stateKey = 'spotify_auth_state';

module.exports = Router()
  .get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
  querystring.stringify({
    response_type: 'code',
    client_id,
    scope, 
    redirect_uri,
  }));
  })

  .get('/callback', (req, res) => {

    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;

  
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
      },
      json: true
    };


    request.post(authOptions, (error, response, body) => {
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
