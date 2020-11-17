const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

// check front end pathing
app.use('/api/v1', require('./controllers/auth-controller'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
