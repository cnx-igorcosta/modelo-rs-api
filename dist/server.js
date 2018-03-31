'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _search = require('./app/routes/search.js');

var _modeloRs = require('./app/routes/modeloRs.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

//db options
var options = {
    keepAlive: 300000,
    connectTimeoutMS: 30000
};

//db connection
_mongoose2.default.connect(_config2.default.DBHost, options);
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if (_config2.default.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use((0, _morgan2.default)('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json({ type: 'application/json' }));

app.get('/', function (req, res) {
    return res.json({ message: 'Bem vindo ao cérebro da Google das RS!' });
});

app.route('/searchModelos').post(_search.searchModelos);

app.route('/modeloRs').get(_modeloRs.getModelosRs).post(_modeloRs.postModeloRs);

app.route('/modeloRs/:_id').get(_modeloRs.getModeloRs).delete(_modeloRs.deleteModeloRs).put(_modeloRs.putModeloRs);

app.listen(port);
console.log('Listening on port ' + port);

exports.default = app;