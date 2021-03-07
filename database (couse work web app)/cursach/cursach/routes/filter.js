const express = require('express');
const filterController = require('../controllers/filter');
const speedController = require('../controllers/speed');
const router = express.Router();


router
    .get('/students', filterController.filterStudents)
    .get("/marks", filterController.filterMarks)
    .get("/subjects", filterController.filterSubjects)
    .get("/topics", filterController.filterTopics)
    .get('/speed', speedController.checkspeed)

module.exports = router;