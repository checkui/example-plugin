/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const requestPromise = require('request-promise');

const app = express();
app.use(bodyParser.json());
app.post('/plugins/string-length', ({ body }, res) => {
  requestPromise({
    body,
    json: true,
    method: 'POST',
    uri: 'http://localhost:3040',
  })
  .then(result => res.send(result));
});
app.listen(3030, () => console.log('ready'));
