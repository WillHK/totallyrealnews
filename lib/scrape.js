const debug = require('debug')('fakenews:scraper');
const rp = require('request-promise');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../db');

module.exports.theOnion = function() {
  axios.get('https://www.theonion.com')
    .then((res) => {
      if(res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        let articles = [];
        $('.post-wrapper').each(function(i, elem) {
          articles[i] = {
            title: $(this).find('h1').text().trim(),
            url: $(this).find('h1').children('a').attr('href'),
            date: $(this).find('time').attr('datetime'),
            excerpt: $(this).find('.excerpt').text().trim(),
          };
          db.query('SELECT * FROM articles WHERE title = $1', [articles[i].title], (err, res) => {
            if (res.rows > 0) {
              console.log('Article already in db');
            } else {
              db.query('INSERT INTO articles VALUES ($1, $2, $3, $4);', [articles[i].title, articles[i].url, articles[i].date, articles[i].excerpt], (err, res) => {
                console.log(res.rows);
              })
            }
          });
        });

      }
    }, (err) => console.log(err));
}
