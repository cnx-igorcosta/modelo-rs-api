import mongoose from 'mongoose'
import ModeloRs from '../models/modeloRs'

// POST /searchModelos
const searchModelos = (req, res) => {
    let busca = req.body.busca
    if(busca) {
        busca = adicionarSinonimos(busca)
        ModeloRs.find({$text: {$search: busca}})
           .exec((err, modelos) => {
            if(err) { error(err, res) }
            else{
                res.json(modelos)
            }
        })
    }
}


function adicionarSinonimos(busca) {
    let buscaComSinonimos = busca;
    //pega os nomes dos atributos de conjuntos de sinonimos
    var conjuntos = Object.keys(sinonimos)
    //percorre os nomes dos atributos
    for (let i=0; i<conjuntos.length; i++) {
        let conjunto = conjuntos[i];
        //verifica se na busca existe a palavra principal do conjunto de sinonimos
        if(new RegExp(conjunto).test(busca)) {
           for(let j=0; j < sinonimos[conjunto].length; j++) {
               let sinonimo = sinonimos[conjunto][j];
                buscaComSinonimos += ' ' + sinonimo
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
    return buscaComSinonimos
}

function error(err, res) {
    let retorno = {
        erro: true,
        err
     }
    res.send(retorno)
}

const sinonimos = {
    dsv: [
        "desenvolvimento",
        "desenv"
    ],
    hml: [
        "homologacao",
        "homologaçao",
        "homologação",
        "homol"
    ],
    prd: [
        "producao",
        "produçao",
        "produção",
        "prod"
    ],
    brsa: [
        "bsra"
    ],
    ic: [
        "integracao",
        "integração",
        "integracão",
        "continua",
        "contínua"
    ]
}

export { searchModelos }