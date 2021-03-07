const express = require('express');
const generateController = require('../controllers/generate.js');
const router = express.Router();


router
    .get('/students', generateController.getStudentsByCount)
    .get("/marks", generateController.getMarksByCount)
    .get("/subjects", generateController.getSubjectsByCount)
    .get("/topics", generateController.getTopicsByCount)

module.exports = router;