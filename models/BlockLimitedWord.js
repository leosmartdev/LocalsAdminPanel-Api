const mongoose = require('mongoose');

const BlockLimitedWordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  replacewith: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('BlockLimitedWord', BlockLimitedWordSchema);
