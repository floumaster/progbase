const cons = require('consolidate');
const fs = require('fs');
const model = require('../main_modules/model');
var cmd = require('node-cmd');
module.exports = {
    async dbrestore(req, res) {
        let arr = [];
        let available = [];
        let database = fs.readFileSync("./public/databases.txt", 'utf8');
        let table = fs.readFileSync("./public/tables.txt", 'utf8');
        arr = database.split('\n')
        let databases = [];
        let tables = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes('|')) {
                arr[i] = arr[i].split(' | ');
                available.push(arr[i][0]);
                let obj = {};
                obj.name = arr[i][0];
                obj.date = arr[i][1];
                databases.push(obj);
            }
        }
        arr = table.split('\n')
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes('|')) {
                arr[i] = arr[i].split(' | ');
                let obj = {};
                obj.name = arr[i][0];
                obj.date = arr[i][1];
                tables.push(obj);
            }
        }
        const answer = req.param("dbname");
        if (!available.includes(answer)) {
            throw new Error('Неверное название файла. ');
        }
        cmd.runSync(`psql --host "127.0.0.1" --port "5432" -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'University' AND pid <> pg_backend_pid()"`);
        cmd.runSync(`dropdb --host "127.0.0.1" --port "5432" "University" && createdb --host "127.0.0.1" --port "5432" "University" && psql --host "127.0.0.1" --port "5432" -U postgres "University" < ~/helpa_marine/cursach/backups/database/${answer}.sql`);
        res.render('recovery', { databases, tables });
    },
    async tbrestore(req, res) {
        let arr = [];
        let available = [];
        let database = fs.readFileSync("./public/databases.txt", 'utf8');
        let table = fs.readFileSync("./public/tables.txt", 'utf8');
        arr = database.split('\n')
        let databases = [];
        let tables = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes('|')) {
                arr[i] = arr[i].split(' | ');
                let obj = {};
                obj.name = arr[i][0];
                obj.date = arr[i][1];
                databases.push(obj);
            }
        }
        arr = table.split('\n')
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes('|')) {
                arr[i] = arr[i].split(' | ');
                available.push(arr[i][0]);
                let obj = {};
                obj.name = arr[i][0];
                obj.date = arr[i][1];
                tables.push(obj);
            }
        }
        const answer = req.param("tbname");
        if (!available.includes(answer)) {
            throw new Error('Неверное название файла. ');
        }
        await model.makeQuery(`TRUNCATE ${answer} CASCADE`);
        cmd.runSync(`pg_restore --host "127.0.0.1" --port "5432" --username "postgres" --no-password --dbname "University" --data-only --verbose --schema "public" --table "${answer}" "/home/flomaster/helpa_marine/cursach/backups/tables/${answer}.sql"`);
        res.render('recovery', { databases, tables });
    },
    async empty(req, res) {
        let arr = [];
        let database = fs.readFileSync("./public/databases.txt", 'utf8');
        let table = fs.readFileSync("./public/tables.txt", 'utf8');
        arr = database.split('\n')
        let databases = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes('|')) {
                let obj = {};
                obj.name = arr[i].split(' | ')[0];
                obj.date = arr[i].split(' | ')[1];
                databases.push(obj);
            }
        }
        arr = table.split('\n')
        let tables = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes('|')) {
                let obj = {};
                obj.name = arr[i].split(' | ')[0];
                obj.date = arr[i].split(' | ')[1];
                tables.push(obj);
            }
        }
        res.render('recovery', { databases, tables });
    },
};