const cons = require('consolidate');
const fs = require('fs');
const model = require('../main_modules/model');
module.exports = {
    async filterStudents(req, res) {
        let iddef = Number.parseInt(req.param("iddef") || -1);
        let idleft = Number.parseInt(req.param("idleft") || -1);
        let idright = Number.parseInt(req.param("idright") || -1);
        let surdef = req.param("surdef") || "";
        let surstart = req.param("surstart") || "";
        let surend = req.param("surend") || "";
        let namedef = req.param("namedef") || "";
        let namestart = req.param("namestart") || "";
        let nameend = req.param("nameend") || "";
        let patdef = req.param("patdef") || "";
        let patstart = req.param("patstart") || "";
        let patend = req.param("patend") || "";
        let agedef = Number.parseInt(req.param("agedef") || -1);
        let ageleft = Number.parseInt(req.param("ageleft") || -1);
        let ageright = Number.parseInt(req.param("ageright") || -1);
        let query = 'select * from student where';
        let ctrl = 0;
        if (iddef !== -1) {
            query += ` id = ${iddef} and`;
            ctrl++;
        }
        if (idleft !== -1) {
            query += ` id > ${idleft} and`;
            ctrl++;
        }
        if (idright !== -1) {
            query += ` id < ${idright} and`;
            ctrl++;
        }
        if (surdef !== "") {
            query += ` surname = '${surdef}' and`;
            ctrl++;
        }
        if (surstart !== "") {
            query += ` surname like '${surstart}%' and`;
            ctrl++;
        }
        if (surend !== "") {
            query += ` surname like '%${surend}' and`;
            ctrl++;
        }
        if (namedef !== "") {
            query += ` name = '${namedef}' and`;
            ctrl++;
        }
        if (namestart !== "") {
            query += ` name like '${namestart}%' and`;
            ctrl++;
        }
        if (nameend !== "") {
            query += ` name like '%${nameend}' and`;
            ctrl++;
        }
        if (patdef !== "") {
            query += ` patronymic = '${patdef}' and`;
            ctrl++;
        }
        if (patstart !== "") {
            query += ` patronymic like '${patstart}%' and`;
            ctrl++;
        }
        if (patend !== "") {
            query += ` patronymic like '%${patend}' and`;
            ctrl++;
        }
        if (agedef !== -1) {
            query += ` age = ${agedef} and`;
            ctrl++;
        }
        if (ageleft !== -1) {
            query += ` age > ${ageleft} and`;
            ctrl++;
        }
        if (ageright !== -1) {
            query += ` age < ${ageright} and`;
            ctrl++;
        }
        if (ctrl === 0) {
            res.render('filterStudents', {});
        } else {
            query = query.substring(0, query.lastIndexOf(' and'));
            const data = await model.makeQuery(query);
            fs.writeFileSync("./public/info.json", JSON.stringify(data, null, 4));
            res.render('filterStudents', { data });
        }
    },
    async filterMarks(req, res) {
        let iddef = Number.parseInt(req.param("iddef") || -1);
        let idleft = Number.parseInt(req.param("idleft") || -1);
        let idright = Number.parseInt(req.param("idright") || -1);
        let agedef = (req.param("agedef") || -1);
        let ageleft = (req.param("ageleft") || -1);
        let ageright = (req.param("ageright") || -1);
        let query = 'select * from mark where';
        let ctrl = 0;
        if (iddef !== -1) {
            query += ` score = ${iddef} and`;
            ctrl++;
        }
        if (idleft !== -1) {
            query += ` score > ${idleft} and`;
            ctrl++;
        }
        if (idright !== -1) {
            query += ` score < ${idright} and`;
            ctrl++;
        }
        if (agedef !== -1) {
            query += ` date = '${agedef}' and`;
            ctrl++;
        }
        if (ageleft !== -1) {
            query += ` date > '${ageleft}' and`;
            ctrl++;
        }
        if (ageright !== -1) {
            query += ` date < '${ageright}' and`;
            ctrl++;
        }
        if (ctrl === 0) {
            res.render('filterMarks', {});
        } else {
            query = query.substring(0, query.lastIndexOf(' and'));
            await model.makeQuery(`drop index index1`).catch(err => { console.log(err) });
            await model.makeQuery(`drop index index2`).catch(err => { console.log(err) });
            let without = new Date().getTime();
            const data = await model.makeQuery(query);
            without = new Date().getTime() - without;
            await model.makeQuery(`create index index1 on mark using btree(date);
            create index index2 on mark using btree(score);`).catch(err => { console.log(err) });
            let withind = new Date().getTime();
            const data_1 = await model.makeQuery(query);
            withind = new Date().getTime() - withind;
            let text = `${without} ${withind}`;
            fs.writeFileSync("./public/speed.txt", text);
            fs.writeFileSync("./info.json", JSON.stringify(data, null, 4));
            res.render('filterMarks', { data });
        }
    },
    async filterSubjects(req, res) {
        let surdef = req.param("surdef") || "";
        let surstart = req.param("surstart") || "";
        let surend = req.param("surend") || "";
        let namedef = req.param("namedef") || "";
        let namestart = req.param("namestart") || "";
        let nameend = req.param("nameend") || "";
        let query = 'select * from subject where';
        let ctrl = 0;
        if (surdef !== "") {
            query += ` name = '${surdef}' and`;
            ctrl++;
        }
        if (surstart !== "") {
            query += ` name like '${surstart}%' and`;
            ctrl++;
        }
        if (surend !== "") {
            query += ` name like '%${surend}' and`;
            ctrl++;
        }
        if (namedef !== "") {
            query += ` section = '${namedef}' and`;
            ctrl++;
        }
        if (namestart !== "") {
            query += ` section like '${namestart}%' and`;
            ctrl++;
        }
        if (nameend !== "") {
            query += ` section like '%${nameend}' and`;
            ctrl++;
        }
        if (ctrl === 0) {
            res.render('filterSubjects', {});
        } else {
            query = query.substring(0, query.lastIndexOf(' and'));
            const data = await model.makeQuery(query);
            fs.writeFileSync("./public/info.json", JSON.stringify(data, null, 4));
            res.render('filterSubjects', { data });
        }
    },
    async filterTopics(req, res) {
        let namedef = req.param("namedef") || "";
        let namestart = req.param("namestart") || "";
        let nameend = req.param("nameend") || "";
        let query = 'select * from topic where';
        let ctrl = 0;
        if (namedef !== "") {
            query += ` name = '${namedef}' and`;
            ctrl++;
        }
        if (namestart !== "") {
            query += ` name like '${namestart}%' and`;
            ctrl++;
        }
        if (nameend !== "") {
            query += ` name like '%${nameend}' and`;
            ctrl++;
        }
        if (ctrl === 0) {
            res.render('filterTopics', {});
        } else {
            query = query.substring(0, query.lastIndexOf(' and'));
            const data = await model.makeQuery(query);
            fs.writeFileSync("./public/info.json", JSON.stringify(data, null, 4));
            res.render('filterTopics', { data });
        }
    },
};