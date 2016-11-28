/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const requestPromise = require('request-promise');

// const pluginStringLength = require('plugin-string-length');

const app = express();
app.use(bodyParser.json());
app.post('/plugins/string-length', ({ body }, res) => {
  requestPromise({
    body,
    json: true,
    method: 'POST',
    uri: 'http://localhost:3040',
  })
  .then((result) => {
    res.send('xxx');
  });
});
app.listen(3030, () => console.log('ready'));
