const cons = require('consolidate');
const fs = require('fs');
const model = require('../main_modules/model');
module.exports = {
    async checkspeed(req, res) {
        res.render('speed', {});
    },
};