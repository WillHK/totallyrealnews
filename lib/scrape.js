const debug = require('debug')('fakenews:scraper');
const axios = require('axios');
const cheerio = require('cheerio');
const article = require('../models/article');

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
          article.selectTitle([articles[i].title])
          .then((res) => {
            if (res.rowCount > 0) {
              console.log('Article already in db');
            } else {
              if (articles[i].excerpt != '') {
                article.insertArticle({newTitle:articles[i].title, newUrl: articles[i].url, newDate: articles[i].date, newExcerpt: articles[i].excerpt, newSite: articles[i].site})
                .then((res)=> {
                  console.log(res ? 'Success':'Failure');
                })
                .catch(err => console.log(err));
              }
            }
          })
          .catch(err=> console.log(err));
        });
      }
    })
}