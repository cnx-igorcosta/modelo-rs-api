'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ModeloRsSchema = new Schema({
    numero: { type: Number, required: true },
    descricao: { type: String, required: true },
    grupo: { type: String },
    ambiente: { type: String, default: 'dsv' },
    deAcordo: { type: Boolean, default: false },
    observacao: { type: String }
});
ModeloRsSchema.index({
    descricao: 'text',
    grupo: 'text',
    ambiente: 'text'
}, { "weights": { descricao: 3, ambiente: 2, grupo: 1 } }, { default_language: "portuguese" });

var ModeloRs = _mongoose2.default.model('modeloRs', ModeloRsSchema);
exports.default = ModeloRs;