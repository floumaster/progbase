const cons = require('consolidate');
const fs = require('fs');
const model = require('../main_modules/model');
var cmd = require('node-cmd');
module.exports = {
    async dbbackup(req, res) {
        const name = req.param("dbname")
        cmd.runSync(`pg_dump --host "127.0.0.1" --port "5432" -U postgres "University" > ~/helpa_marine/cursach/backups/database/${name}.sql`);
        let databases = fs.readFileSync("./public/databases.txt");
        databases += `\n${name} | ${Date()}`;
        fs.writeFileSync("./public/databases.txt", databases);
        const msg = "Success!"
        res.render('backup', { msg });
    },
    async tbbackup(req, res) {
        const tbname = req.param("tbname")
        let tables = fs.readFileSync("./public/tables.txt");
        tables += `\n${tbname} | ${Date()}`;
        fs.writeFileSync("./public/tables.txt", tables);
        cmd.runSync(`pg_dump --host "127.0.0.1" --port "5432" --file "/home/flomaster/helpa_marine/cursach/backups/tables/${tbname}.sql" --username "postgres" --no-password --verbose --format=c --blobs --table "public.${tbname}" "University"`);
        const msg = "Success!"
        res.render('backup', { msg });
    },
    async empty(req, res) {

        res.render('backup', {});
    },
};