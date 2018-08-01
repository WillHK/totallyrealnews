const debug = require('debug')('fakenews:scraper');
const rp = require('request-promise');
const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('../model/article.js');

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
        });

      }
    }, (err) => console.log(err));
}
