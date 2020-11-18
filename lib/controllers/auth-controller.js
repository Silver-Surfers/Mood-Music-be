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

  });

  
// .get('/callback', (req, res) => {

//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   const code = req.query.code || null;

  
//   // res.clearCookie(stateKey);
//   const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code,
//       redirect_uri,
//       grant_type: 'authorization_code',
//     },
//     headers: {
//       'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
//     },
//     json: true
//   }


//     .post(authOptions, (error, response, body) => {
//       if(!error && response.statusCode === 200) {

//         const access_token = body.access_token,
//           refresh_token = body.refresh_token;

//         // oAuth ends here 

//         const options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         request.get(options, (error, response, body) => {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//         querystring.stringify({
//           access_token,
//           refresh_token
//         }));
//       } else {
//         res.redirect('/#' +
//         querystring.stringify({
//           error: 'invalid_token'
//         }));
//       }
//     });
// });

