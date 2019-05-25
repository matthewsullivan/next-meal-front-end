const compression = require('compression');
const express = require('express');
const prpl = require('prpl-server');

const app = express();
const config = require('./build/polymer.json');

app.set('trust proxy', true);

app.use(compression());
app.use(express.static('static', {dotfiles: 'allow'}));

app.get('/*', prpl.makeHandler('./build/', config));

app.listen(80, () => {
  console.log(`\nNext Meal`);
  console.log(`Path: 127.0.0.1`);
  console.log(`${new Date().toString()}\n`);
});
