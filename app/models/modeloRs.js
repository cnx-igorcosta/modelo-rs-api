import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ModeloRsSchema = new Schema(
    {
        numero: { type: Number, required: true},
        tipo: { type: String, default: 'RS' },
        descricao: { type: String, required: true },
        grupo: { type: String },
        numeroRdm: { type: Number },
        ambiente: { type: String, default: 'dsv' },
        deAcordo: { type: Boolean, default: false },
        precisaRs: { type: Boolean, default: false },
        observacao: { type: String }
    }
)
ModeloRsSchema.index(
    {
        descricao: 'text', 
        grupo: 'text', 
        ambiente: 'text'
    }, 
    {"weights": { descricao: 3, ambiente: 2, grupo:1 }},
    { default_language: "portuguese" }

)

const ModeloRs = mongoose.model('modeloRs', ModeloRsSchema)
export default ModeloRs
