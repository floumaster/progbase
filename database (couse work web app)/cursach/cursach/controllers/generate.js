const cons = require('consolidate');
const fs = require('fs');
const model = require('../main_modules/model');
const data_rep = require('../repositories/generate.js');
const dataRepository = new data_rep();
module.exports = {
    async getStudentsByCount(req, res) {
        let count = Number.parseInt(req.param("count") || 0);
        let students = '';
        if (count !== 0) {
            students = await dataRepository.generateStudents(count);
            fs.writeFileSync("students.csv", students);
            await model.makeQuery(`copy student("surname", "name", "patronymic", "age") FROM '/home/flomaster/helpa_marine/cursach/students.csv' WITH(FORMAT CSV, HEADER)`).catch(err => { throw new Error(err) });
        }
        res.statusCode = 200;
        let studentsArr = [];
        const arr = students.split('\n');
        for (let i = 1; i < arr.length; i++) {
            let obj = {};
            obj.surname = arr[i].split(',')[0];
            obj.name = arr[i].split(',')[1];
            obj.patronymic = arr[i].split(',')[2];
            obj.age = arr[i].split(',')[3];
            studentsArr.push(obj);
        }
        const entity = 'students';
        res.render('generateStudents', { studentsArr, entity });
    },
    async getMarksByCount(req, res) {
        let count = Number.parseInt(req.param("count") || 0);
        let marks = '';
        if (count !== 0) {
            marks = await dataRepository.generateMarks(count);
            fs.writeFileSync("marks.csv", marks);
            await model.makeQuery(`copy mark("score", "date", "studentId", "subjectId", "topicId") FROM '/home/flomaster/helpa_marine/cursach/marks.csv' WITH(FORMAT CSV, HEADER)`).catch(err => { throw new Error(err) });
        }
        res.statusCode = 200;
        const arr = marks.split('\n');
        let marksArr = [];
        for (let i = 1; i < arr.length; i++) {
            let obj = {};
            obj.score = arr[i].split(',')[0];
            obj.date = arr[i].split(',')[1];
            marksArr.push(obj);
        }
        const entity = 'marks';
        res.render('generateMarks', { marksArr, entity });
    },
    async getSubjectsByCount(req, res) {
        let subjects = '';
        let count = Number.parseInt(req.param("count"));
        if (count === 0) {
            subjects = await dataRepository.generateSubjects();
            //fs.writeFileSync("subjects.csv", subjects);
            //await model.makeQuery(`copy subject("name", "section") FROM '/home/flomaster/helpa_marine/cursach/subjects.csv' WITH(FORMAT CSV, HEADER)`).catch(err => { throw new Error(err) });
        }
        res.statusCode = 200;
        const arr = subjects.split('\n');
        let subjectsArr = [];
        for (let i = 1; i < arr.length; i++) {
            let obj = {};
            obj.name = arr[i].split(',')[0];
            obj.section = arr[i].split(',')[1];
            subjectsArr.push(obj);
        }
        const entity = 'subjects';
        res.render('generateSubjects', { subjectsArr, entity });
    },
    async getTopicsByCount(req, res) {
        let topics = '';
        let count = Number.parseInt(req.param("count") || 0);
        if (count !== 0) {
            topics = await dataRepository.generateTopics(count);
            fs.writeFileSync("topics.csv", topics);
            await model.makeQuery(`copy topic("name", "subjectId") FROM '/home/flomaster/helpa_marine/cursach/topics.csv' WITH(FORMAT CSV, HEADER)`).catch(err => { throw new Error(err) });
        }
        res.statusCode = 200;
        const arr = topics.split('\n');
        let topicsArr = [];
        for (let i = 1; i < arr.length; i++) {
            let obj = {};
            obj.name = arr[i].split(',')[0];
            topicsArr.push(obj);
        }
        const entity = 'topics';
        res.render('generateTopics', { topicsArr, entity });
    },
};