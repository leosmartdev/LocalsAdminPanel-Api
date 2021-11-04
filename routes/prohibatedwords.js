const express = require("express");
const router = express.Router();
const { fetchProhibitedWords, addNewProhibitedWord, deleteProhibitedWord, updateProhibitedWord } = require("../controllers/prohibatedwords");

router.route('/').get(fetchProhibitedWords).post(addNewProhibitedWord).put(updateProhibitedWord);
router.route('/:id').delete(deleteProhibitedWord);

module.exports = router;