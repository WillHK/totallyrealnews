const { Pool } = require('pg');

const connectionString = 'postgres://kxsyyapj:E1PFbXchRF0-vnmpPIkd2DAkE66Nhy-0@stampy.db.elephantsql.com:5432/kxsyyapj';
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (Text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: rowCount });
      callback(err, res);
    });
  }
};
