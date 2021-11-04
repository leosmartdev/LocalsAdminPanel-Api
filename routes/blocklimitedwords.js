const express = require('express');
const router = express.Router();
const {
  fetchBlockLimitedWords,
  addNewBlockLimitedWord,
  updateBlockLimitedWord,
  deleteBlockLimitedWord
} = require('../controllers/blocklimitedwords');

router.route('/').get(fetchBlockLimitedWords).post(addNewBlockLimitedWord).put(updateBlockLimitedWord);
router.route('/:id').delete(deleteBlockLimitedWord);

module.exports = router;
