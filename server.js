import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import config from 'config'
//import cors from 'cors'

import { searchModelos } from './app/routes/search.js'
import { getModelosRs, postModeloRs, getModeloRs, deleteModeloRs, putModeloRs } from './app/routes/modeloRs.js'

const app = express()
const port = process.env.PORT || 3000

//db options
const options = {
    keepAlive: 300000,
    connectTimeoutMS: 30000,
};

const uri = process.env.MONGODB_URI || config.DBHost
//db connection
mongoose.connect(uri, options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')) //'combined' outputs the Apache style LOGs
}

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain)
//parse application/json and look for raw text
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({type: 'application/json'}))

app.get('/', (req, res) => res.json({message: 'Bem vindo ao cérebro da Google das RS!'}))

app.route('/searchModelos')
    .post(searchModelos)

app.route('/modeloRs')
    .get(getModelosRs)
    .post(postModeloRs)

app.route('/modeloRs/:_id')
    .get(getModeloRs)
    .delete(deleteModeloRs)    
    .put(putModeloRs)

app.listen(port)
console.log(`Listening on port ${port}`)

export default app