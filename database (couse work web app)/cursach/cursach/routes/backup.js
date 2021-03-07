const express = require('express');
const backupController = require('../controllers/backup');
const router = express.Router();


router
    .get('/', backupController.empty)
    .get('/db', backupController.dbbackup)
    .get("/tb", backupController.tbbackup)

module.exports = router;