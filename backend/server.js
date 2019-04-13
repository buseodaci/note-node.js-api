const express = require('express');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const bodyParser = require('body-parser');
const db = require('./app/config/db');
const cors=require('cors');
const app = express();

const port = 8000;
app.use(cors());
app.use(bodyParser.json());
MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})

