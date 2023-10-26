const express = require('express');
const exportController = require('../Controller/exportController');

const router = express.Router();

router.get('/export/books', exportController.exportBooks);
// router.post('/stores/save', exportController.saveStore);

module.exports = router;
