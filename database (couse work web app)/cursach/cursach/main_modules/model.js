const { Sequelize } = require('sequelize');
let sequelize = new Sequelize(
    'University',
    'postgres',
    '66lularo', {
        host: "127.0.0.1",
        port: 5432,
        dialect: 'postgres',
        timestamps: false,
    },
)

async function check() {
    console.log('Подключаемся к главному серверу...');
    sequelize = new Sequelize(
        'University',
        'postgres',
        '66lularo', {
            host: "127.0.0.1",
            port: 5432,
            dialect: 'postgres',
            timestamps: false,
        },
    )
    await sequelize
        .authenticate()
        .then(() => {
            console.log('Подключение установлено успешно.');

        })
        .catch(err => {
            console.log('Невозможно подключиться к главному серверу');
            console.log('Подключаемся к ведомому серверу');
            sequelize = new Sequelize(
                'University',
                'postgres',
                '66lularo', {
                    host: "127.0.0.1",
                    port: 5434,
                    dialect: 'postgres',
                    timestamps: false,
                },
            )
        }).finally(() => {
            Student.init({
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                surname: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                },
                name: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                },
                patronymic: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                },
                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                },
            }, { sequelize, modelName: 'student', tableName: 'student', timestamps: false })

            Mark.init({
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                score: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                },
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                },
            }, { sequelize, modelName: 'mark', tableName: 'mark', timestamps: false })

            Subject.init({
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                name: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                    comment: "name of the subject, string",
                },
                section: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                }
            }, { sequelize, modelName: 'subject', tableName: 'subject', timestamps: false })

            Topic.init({
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                name: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    primaryKey: false,
                    autoIncrement: false,
                    unique: false,
                }
            }, { sequelize, modelName: 'topic', tableName: 'topic', timestamps: false })

            Student.hasMany(Mark);
            Subject.hasMany(Topic);
            Subject.hasMany(Mark);
            Topic.hasMany(Mark);
        })

}

class Student extends Sequelize.Model {};
class Mark extends Sequelize.Model {};
class Subject extends Sequelize.Model {};
class Topic extends Sequelize.Model {};

const operations = {
    async insert(model, data) {
        await models[model].create(data).catch(err => console.log(err));
        const id = await sequelize.query(`SELECT MAX(id) FROM ${model}`, { raw: true, type: Sequelize.QueryTypes.SELECT, }).catch(err => { throw new Error(err); })
        return id[0].max;
    },
    async update(model, data, condition) {
        await models[model].update(data, { where: condition }).catch(err => { throw new Error(err) });
    },
    async delete(model, condition) {
        await models[model].destroy({ where: condition }).catch(err => { throw new Error(err) });
    },
    async select(model) {
        let data;
        await models[model].findAll({ raw: true }).then(entities => {
            data = entities
        }).catch(err => { throw new Error(err) });
        return data;
    },
    async select_with_condition(model, condition) {
        let data;
        await models[model].findAll({
            where: {
                condition
            }
        }).then(entities => {
            data = entities
        }).catch(err => { throw new Error(err) });
        return data;
    },
    async get_last_id(model, field) {
        const id = await sequelize.query(`select ${field} from ${model} where id = (select max(id) from ${model}) `, { raw: true, type: Sequelize.QueryTypes.SELECT, }).catch(err => { throw new Error(err); })
        return id[0][field];
    },
    async get_first_id(model, field) {
        const id = await sequelize.query(`select ${field} from ${model} where id = (select min(id) from ${model}) `, { raw: true, type: Sequelize.QueryTypes.SELECT, }).catch(err => { throw new Error(err); })
        return id[0][field];
    },
    getRelations(model) {
        let relations_arr = [];
        for (let key in models[model].rawAttributes) {
            if (key.includes('Id')) {
                relations_arr.push(key.substring(0, key.indexOf('Id')));
            }
        }
        return relations_arr;
    },
    async makeCopy() {
        await sequelize.query(`pg_dump "School" > /home/flomaster/dbCoursework/school.dump`, { raw: true, type: Sequelize.QueryTypes.SELECT, }).catch(err => { throw new Error(err); });
    },
    getFields(model) {
        let fields_arr = [];
        for (let key in models[model].rawAttributes) {
            if (!key.includes('Id')) {
                fields_arr.push([key, models[model].rawAttributes[key].type.key.toLowerCase()])
            }
        }
        return fields_arr;
    },
    async makeQuery(query) {
        let data;
        await sequelize.query(query, { raw: true, type: Sequelize.QueryTypes.SELECT, }).catch(err => {
            throw new Error(err);
        }).then(entity => { data = entity });
        return data;
    },
    async check_connection() {
        await check();
    }
}


const models = {
    'student': Student,
    'mark': Mark,
    'subject': Subject,
    'topic': Topic
}

module.exports = operations;