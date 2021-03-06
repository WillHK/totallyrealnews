const { Pool } = require('pg');

const connectionString = process.env.PG_CONNECTION_URI;
const pool = new Pool({
  connectionString: connectionString,
  max: 4,
});

let connections = [];

module.exports = {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      pool.query(text, params, (err, res) => {
        const duration = Date.now() - start;
        console.log('executed query', { text, params, duration });
        if (err) {
          console.log('error saving to db: ' + err);
          reject(0);
        } else {
          return resolve(res);
        }
      });
    });
  }
};
