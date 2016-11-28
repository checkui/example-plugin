/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'www')));
app.listen(3033, () => console.log('ready'));
