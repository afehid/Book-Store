const express = require('express');
const bookController = require('../Controller/bookController');

const router = express.Router();

router.get('/books', bookController.getBookList);
router.get('/books/details/:id', bookController.getBookDetails);
router.post('/books/save', bookController.saveBook);
router.put('/books/update', bookController.updateBook);
router.delete('/books/delete/:id', bookController.deleteBook);

module.exports = router;
