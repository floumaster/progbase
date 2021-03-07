const express = require('express');
const recoveryController = require('../controllers/recovery');
const router = express.Router();


router
    .get('/', recoveryController.empty)
    .get('/db', recoveryController.dbrestore)
    .get("/tb", recoveryController.tbrestore)

module.exports = router;