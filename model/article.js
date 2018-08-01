const mongoose = require('mongoose');
const debug = require('debug')('fakenews:article');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ArticleSchema = Schema({
  
})