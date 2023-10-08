const express = require('express');
const storeController = require('../Controller/storeController');

const router = express.Router();

router.get('/stores', storeController.getStoreList);
router.post('/stores/save', storeController.saveStore);

module.exports = router;
