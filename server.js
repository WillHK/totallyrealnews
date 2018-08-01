const express = require('express');
require('dotenv').config();
const app = express();
const scrape = require('./lib/scrape');
scrape.theOnion();
let theOnion = setInterval(scrape.theOnion, 3600000);

app.use(express.static('public'));
app.listen(process.env.PORT || 3000, function() {
  console.log(`App listening on port ${process.env.port || 3000}`);
});
