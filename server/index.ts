import express from 'express'
import * as bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(`Hello Todoz API 9!`)
})

app.listen(7474, () => {
    console.log(`Todoz server running...`)
})