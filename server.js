const express = require('express');
require('dotenv').config();
const app = express();
const scrape = require('./lib/scrape');

// scrape.theOnion();

app.use(express.static('public'));
app.listen(process.env.PORT || 3000, function() {
  console.log(`App listening on port ${process.env.port || 3000}`);
});
