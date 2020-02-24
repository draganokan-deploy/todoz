import express from 'express'
import * as bodyParser from 'body-parser'
import DB from './db'

const db = new DB()

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(`Hello Todoz API 10!`)
})

app.post('/all', (req, res) => {
    res.json({
        data: db.selectAll()
    })
})

app.post('/create', (req, res) => {
    res.json({
        data: db.insert(req.body.labels)
    })
})

app.get('/update/:id/:column', (req, res) => {
    res.json({
        data: db.update(parseInt(req.params.id), req.params.column, req.body.value)
    })
})

app.post('/delete/:id', (req, res) => {
    res.json({
        data: db.delete(req.body.id)
    })
})

app.listen(7474, () => {
    console.log(`Todoz server running...`)
})

// -- DATABASE -----------

