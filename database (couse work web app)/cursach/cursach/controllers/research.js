const cons = require('consolidate');
const fs = require('fs');
const model = require('../main_modules/model');
module.exports = {
    async rating(req, res) {
        let query = `select student.id, name, surname, patronymic, avg(score) from student, mark
        where student.id = mark."studentId"
        group by student.id
        order by avg desc`;
        const rating = await model.makeQuery(query);
        fs.writeFileSync("./public/info.json", JSON.stringify(rating, null, 4));
        let str = `Общий рейтинг студентов`;
        rating.forEach(element => {
            str += `\n${element.surname} ${element.name} ${element.patronymic} ${element.avg}`;
        });
        fs.writeFileSync("./public/chart.txt", str);
        res.render('research', { rating });
    },
    async oneSubject(req, res) {
        let subject = (req.param("subject"));
        let query = `select student.id, student.name, surname, patronymic, avg(score) from student, mark, subject
        where student.id = mark."studentId"
        and subject.id = mark."subjectId"
        and subject.name = '${subject}'
        group by student.id
        order by avg desc`;
        const rating = await model.makeQuery(query);
        fs.writeFileSync("./public/info.json", JSON.stringify(rating, null, 4));
        let str = `Рейтинг студентов по предмету ${subject}`;
        rating.forEach(element => {
            str += `\n${element.surname} ${element.name} ${element.patronymic} ${element.avg}`;
        });
        fs.writeFileSync("./public/chart.txt", str);
        res.render('research', { rating });
    },
    async allSubjects(req, res) {
        let stud = Number.parseInt(req.param("student"));
        let query = `select subject.name, avg(score) from student, mark, subject
        where student.id = mark."studentId"
        and mark."subjectId" = subject.id
        and student.id = ${stud}
        group by subject.name`;
        const student = await model.makeQuery(query);
        fs.writeFileSync("./public/info.json", JSON.stringify(student, null, 4));
        let str = `Оценки студента номер ${stud} по всем предметам`;
        student.forEach(element => {
            str += `\n${element.name} ${element.avg}`;
        });
        fs.writeFileSync("./public/chart.txt", str);
        res.render('research', { student });
    },
    async empty(req, res) {
        res.render('research', {});
    },
};