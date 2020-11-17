const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = 'REDIRECT_URI'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

//We need to figure out Bcrypt for this function (generateRandomString) for storing cookie
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const app = express();

app.get('/login', (req, res) => {

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state
    }));
});
