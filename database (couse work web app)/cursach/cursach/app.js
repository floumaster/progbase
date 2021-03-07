const express = require('express');
const bodyParser = require("body-parser");
const busboy = require('busboy-body-parser');
const mustache = require('mustache-express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const generateRouter = require('./routes/generate.js');
const filterRouter = require('./routes/filter.js');
const researchRouter = require('./routes/research.js');
const backupRouter = require('./routes/backup.js');
const recoveryRouter = require('./routes/recovery.js');
const busboyOptions = {
    limit: '10mb',
    multi: false,
}
const viewDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewDir, 'partials');
app.engine('mst', mustache(partialsDir));
app.set('views', viewDir);
app.set('view engine', 'mst');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboy(busboyOptions));
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/chart', function(req, res) {
    res.render('chart');
});
app.get('/anal_itics', function(req, res) {
    res.render('anal_itics');
});
app.get('/flex', function(req, res) {
    res.render('flex');
});
app.get('/speed', function(req, res) {
    res.render('speed', {});
});
app.use('/generate', generateRouter);
app.use('/filter', filterRouter);
app.use('/research', researchRouter);
app.use('/backup', backupRouter);
app.use('/recovery', recoveryRouter);


app.listen(3000, () => console.log('ready'));