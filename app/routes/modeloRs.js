import mongoose from 'mongoose'
import ModeloRs from '../models/modeloRs'

// GET /modeloRs
const getModelosRs = (req, res) => {
    const query = ModeloRs.find({})
    query.exec((err, modelos) => {
        if(err) { error(err, res) }
        else{
            res.json(modelos)
        }
    })
}

// POST /modeloRS
const postModeloRs = (req, res) => {
    const newModeloRs = new ModeloRs(req.body)
    newModeloRs.save((err, modeloRs) => {
        if(err) { error(err) }
        else {
            res.json({sucesso: true, modeloRs})
        }
    })
}

// GET /modeloRS/:id
const getModeloRs = (req, res) => {
    ModeloRs.findById(req.params._id, (err, modeloRs) => {
        if(err) { error(err, res) }
        else {
            res.send(modeloRs)
        }
    })
}

// DELETE modeloRS/:id
const deleteModeloRs = (req, res) => {
    ModeloRs.remove({ _id: req.params._id }, (err, result) => {
        if(err) { error(err, res) }
        res.json({sucesso: true, result})
    })
}

// PUT /modeloRs/:id
const putModeloRs = (req, res) => {
    ModeloRs.findById({_id: req.params._id}, (err, modeloRs) => {
        if(err) { error(err, res) } 
        Object.assign(modeloRs, req.body).save((err, modeloRS) => {
          if(err) { error(err, res) }
          res.json({ sucesso: true, modeloRS })
        })
      })
}

function error(err, res) {
    let retorno = {
        erro: true,
        err
     }
    res.send(retorno)
}

export { getModelosRs, postModeloRs, getModeloRs, deleteModeloRs, putModeloRs }