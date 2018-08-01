const debug = require('debug')('fakenews:scraper');
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
            site: 'onion',
          };
          db.query('SELECT * FROM articles WHERE title = $1', [articles[i].title])
          .then((res) => {
            if (res.rowCount > 0) {
              console.log('Article already in db');
            } else {
              if (articles[i].excerpt != '') {
                db.query('INSERT INTO articles VALUES (DEFAULT, $1, $2, $3, $4, $5);', [articles[i].title, articles[i].url, articles[i].date, articles[i].excerpt, articles[i].site])
                .then((res)=> {
                  console.log(res ? 'Success':'Failure');
                });
              }
            }
          })
        });
      }
    })
}