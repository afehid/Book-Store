const express = require('express');
const userController = require('../Controller/userController');

const router = express.Router();

router.get('/users', userController.getUserList);
// router.get('/books/details/:id', bookController.getBookDetails);
router.post('/users/save', userController.saveUser);
// router.put('/books/update', bookController.updateBook);
// router.delete('/books/delete/:id', bookController.deleteBook);

module.exports = router;
