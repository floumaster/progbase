const generator = require('../main_modules/generate');

class DataRepository {

    async generateStudents(count) {
        const students = await generator.generatePupils(count);
        return students;
    }
    async generateMarks(count) {
        const marks = await generator.generateMarks(count);
        return marks;
    }
    async generateSubjects(count) {
        const subjects = await generator.generateSubjects(count);
        return subjects;
    }
    async generateTopics(count) {
        const topics = await generator.generateTopics(count);
        return topics;
    }
};


module.exports = DataRepository;