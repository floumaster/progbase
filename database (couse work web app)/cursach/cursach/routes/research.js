const express = require('express');
const researchController = require('../controllers/research');
const router = express.Router();


router
    .get('/', researchController.empty)
    .get('/rating', researchController.rating)
    .get("/subject", researchController.oneSubject)
    .get("/subjects", researchController.allSubjects)
    .get("/topics", researchController.rating)

module.exports = router;