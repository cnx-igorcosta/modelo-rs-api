'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchModelos = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _modeloRs = require('../models/modeloRs');

var _modeloRs2 = _interopRequireDefault(_modeloRs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// POST /searchModelos
var searchModelos = function searchModelos(req, res) {
    var busca = req.body.busca;
    if (busca) {
        busca = adicionarSinonimos(busca);
        _modeloRs2.default.find({ $text: { $search: busca } }).exec(function (err, modelos) {
            if (err) {
                error(err, res);
            } else {
                res.json(modelos);
            }
        });
    }
};

function adicionarSinonimos(busca) {
    var buscaComSinonimos = busca;
    //pega os nomes dos atributos de conjuntos de sinonimos
    var conjuntos = Object.keys(sinonimos);
    //percorre os nomes dos atributos
    for (var i = 0; i < conjuntos.length; i++) {
        var conjunto = conjuntos[i];
        //verifica se na busca existe a palavra principal do conjunto de sinonimos
        if (new RegExp(conjunto).test(busca)) {
            for (var j = 0; j < sinonimos[conjunto].length; j++) {
                var sinonimo = sinonimos[conjunto][j];
                buscaComSinonimos += ' ' + sinonimo;
            }
        }
        //TODO:   
        //se não, percorre todos os conjuntos de sinonimos e verifica se tem alguma palavra
        /*} else {
            for(let j=0; j < sinonimos[conjunto].length; j++) {
                let sinonimo = sinonimos[conjunto][j];
                 buscaComSinonimos += ' ' + sinonimo
            }
        }*/
    }
    return buscaComSinonimos;
}

function error(err, res) {
    var retorno = {
        erro: true,
        err: err
    };
    res.send(retorno);
}

var sinonimos = {
    dsv: ["desenvolvimento", "desenv"],
    hml: ["homologacao", "homologaçao", "homologação", "homol"],
    prd: ["producao", "produçao", "produção", "prod"],
    brsa: ["bsra"],
    ic: ["integracao", "integração", "integracão", "continua", "contínua"]
};

exports.searchModelos = searchModelos;