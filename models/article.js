const db = require('../db');

// returns a promise that will resolve as an array of articles that have the same title as the param newTitle
export function selectArticle(newTitle) {
  return new Promise((resolve, reject) => {
    // expect the title to be a string and not empty
    if (typeof newTitle === 'string' && newTitle !== '') {
      resolve(db.query('SELECT * FROM articles WHERE title = $1', [newTitle]));
    } else {
      reject('Title must be a non-empty string');
    }
  });
}

export function insertArticle(newArticle) {
  return new Promise((resolve, reject) => {
    // type check each parameter before trying to insert
    if (newArticle) {
      resolve(db.query('INSERT INTO articles VALUES (DEFAULT, $1, $2, $3, $4, $5);', [newArticle.title, newArticle.url, newArticle.date, newArticle.excerpt, newArticle.site]));
    } else {
      reject('Reasons');
    }
  });
}

// 
// db.query('INSERT INTO articles VALUES (DEFAULT, $1, $2, $3, $4, $5);', [articles[i].title, articles[i].url, articles[i].date, articles[i].excerpt, articles[i].site])