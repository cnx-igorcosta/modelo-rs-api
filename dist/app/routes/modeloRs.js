'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.putModeloRs = exports.deleteModeloRs = exports.getModeloRs = exports.postModeloRs = exports.getModelosRs = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _modeloRs = require('../models/modeloRs');

var _modeloRs2 = _interopRequireDefault(_modeloRs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GET /modeloRs
var getModelosRs = function getModelosRs(req, res) {
    var query = _modeloRs2.default.find({});
    query.exec(function (err, modelos) {
        if (err) {
            error(err, res);
        } else {
            res.json(modelos);
        }
    });
};

// POST /modeloRS
var postModeloRs = function postModeloRs(req, res) {
    var newModeloRs = new _modeloRs2.default(req.body);
    newModeloRs.save(function (err, modeloRs) {
        if (err) {
            error(err);
        } else {
            res.json({ sucesso: true, modeloRs: modeloRs });
        }
    });
};

// GET /modeloRS/:id
var getModeloRs = function getModeloRs(req, res) {
    _modeloRs2.default.findById(req.params._id, function (err, modeloRs) {
        if (err) {
            error(err, res);
        } else {
            res.send(modeloRs);
        }
    });
};

// DELETE modeloRS/:id
var deleteModeloRs = function deleteModeloRs(req, res) {
    _modeloRs2.default.remove({ _id: req.params._id }, function (err, result) {
        if (err) {
            error(err, res);
        }
        res.json({ sucesso: true, result: result });
    });
};

// PUT /modeloRs/:id
var putModeloRs = function putModeloRs(req, res) {
    _modeloRs2.default.findById({ _id: req.params._id }, function (err, modeloRs) {
        if (err) {
            error(err, res);
        }
        Object.assign(modeloRs, req.body).save(function (err, modeloRS) {
            if (err) {
                error(err, res);
            }
            res.json({ sucesso: true, modeloRS: modeloRS });
        });
    });
};

function error(err, res) {
    var retorno = {
        erro: true,
        err: err
    };
    res.send(retorno);
}

exports.getModelosRs = getModelosRs;
exports.postModeloRs = postModeloRs;
exports.getModeloRs = getModeloRs;
exports.deleteModeloRs = deleteModeloRs;
exports.putModeloRs = putModeloRs;