const parse = require('./parser');
const model = require('./model');
const moment = require('moment');


async function generatePeople(count) {
    let names = [];
    let surnames = [];
    let part = [];
    let arr = [];
    let n = 0;
    for (let i = 0; i < 2; i++) {
        await parse.parse().then((data) => {
            names = names.concat(data['name']);
            surnames = surnames.concat(data['surname']);
            part = part.concat(data['patronymic']);
        });
    }
    for (let i = 0; i < names.length; i++) {
        for (let j = 0; j < surnames.length; j++) {
            for (let k = 0; k < part.length; k++) {
                let obj = {};
                obj['name'] = names[i];
                obj['surname'] = surnames[j];
                obj['patronymic'] = part[k];
                arr.push(obj);
                n++;
                if (n === count) {
                    return arr;
                }
            }
        }
    }
    return arr;
}

function generateDates(count) {
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(moment(randomDate(new Date(2001, 0, 1), new Date())).format('YYYY-MM-DD'))
    }
    return arr;
}

function generateRndIntegers(count, min, max) {
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(getRandomInt(min, max));
    }
    return arr;
}

function randomDate(start, end) {
    return new Date(new Date(start).getTime() + Math.random() * (new Date(end).getTime() - new Date(start).getTime()));
}

async function generatePupilId(count) {
    const last = await model.get_last_id('student', 'id');
    const first = await model.get_first_id('student', 'id');
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(getRandomInt(first, last));
    }
    return arr;
}
async function generateTopicId(count) {
    const last = await model.get_last_id('topic', 'id');
    const first = await model.get_first_id('topic', 'id');
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(getRandomInt(first, last));
    }
    return arr;
}
async function generateSubjectId(count) {
    const last = await model.get_last_id('subject', 'id');
    const first = await model.get_first_id('subject', 'id');
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(getRandomInt(first, last));
    }
    return arr;
}

function getRandomSection(count) {
    let arr = [];
    for (let i = 0; i < count; i++) {
        if (getRandomInt(3) === 1) {
            arr.push(`tech`);
        } else if (getRandomInt(3) === 2) {
            arr.push(`phil`);
        } else {
            arr.push(`nat`);
        }
    }
    return arr;
}

function getRandomInt(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const operations = {
    async generateSubjects(count) {
        let info = 'name,section';
        const subjects = [
            ['Історія України ', 'phil'],
            ['Математична логіка', 'tech'],
            ['Філософія', 'phil'],
            ['Українська мова', 'phil'],
            ['Теорія інформації і кодування', 'tech'],
            ['Культурологія', 'phil'],
            ['Екологія', 'nat'],
            ['Вища математика', 'tech'],
            ['Фізика', 'tech'],
            ['Хімія', 'tech'],
            ['Безпека життєдіяльності ', 'nat'],
            ['Психологія', 'phil'],
            ['Соціологія', 'phil'],
            ['Правознавство', 'phil'],
            ['Політологія', 'phil'],
            ['Фізичне виховання', 'tech'],
            ['Військова підготовка', 'tech'],
            ['Лінійна алгебра', 'tech'],
            ['Аналітична геометрія', 'tech'],
            ['Математичний аналіз', 'tech'],
            ['Дискретна математика', 'tech'],
            ['Чисельні методи обчислення', 'tech'],
            ['Компоненти програмної інженерії', 'tech'],
            ['Програмування', 'tech'],
            ['Алгоритми і структури даних', 'tech'],
            ['Бази даних', 'tech'],
            ['Теорія ймовірності', 'tech'],
            ['Математична статистика', 'tech'],
            ['Економіка', 'tech'],
            ['Організація комп`ютерних мереж', 'tech'],
            ['Системне програмування', 'tech'],
            ['Об`єктно-орієнтоване програмування', 'Точный'],
            ['Архітектура операційних систем', 'tech'],
            ['Комп`ютерна логіка', 'tech'],
            ['Архітектура комп`ютера', 'tech']
        ]
        for (let i = 1; i < subjects.length; i++) {
            info += `\n${subjects[i][0]},${subjects[i][1]}`
        }
        return info;
    },
    async generateMarks(count) {
        let str = `score,date,pupilId,subjectId,topicId`;
        let score = generateRndIntegers(count, 1, 12);
        let date = generateDates(count);
        let pid = await generatePupilId(count);
        let sid = await generateSubjectId(count);
        let tid = await generateTopicId(count);
        for (let i = 0; i < count; i++) {
            str += `\n${score[i]},${date[i]},${pid[i]},${sid[i]},${tid[i]}`
        }
        return str;
    },
    async generateTopics(count) {
        let str = `name,subjectId`;
        let first = [];
        let second = [];
        let n = 0;
        const classid = await generateSubjectId(count);
        for (let i = 0; i < 2; i++) {
            await parse.parse_words().then((data) => {
                first = first.concat(data['first']);
                second = second.concat(data['second']);
            });
        }
        const arr = getRandomSection(count);
        for (let i = 0; i < first.length; i++) {
            for (let j = 0; j < second.length; j++) {
                str += `\n${first[i]} ${second[j]},${classid[n]}`;
                n++;
                if (n === count) {
                    return str;
                }
            }
        }
        return str;
    },
    async generatePupils(count) {
        const names = await generatePeople(count);
        const ages = generateRndIntegers(count, 18, 24)
        let info = 'surname,name,patronymic,age';
        for (let i = 0; i < count; i++) {
            info += `\n${names[i].surname},${names[i].name},${names[i].patronymic},${ages[i]}`;
        }
        return info;
    }
}


module.exports = operations;