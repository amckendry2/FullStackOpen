require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Entry = require('./models/entry')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

if(process.env.NODE_ENV !== 'production'){
    const morgan = require('morgan')
    morgan.token('content', (req) => JSON.stringify(req.body))
    app.use(morgan(':method :url :response-time :content'))
}

app.get('/api/info', (_, res) => {
    Entry.find({}).then(entries => {
        res.send(`<p>Database contains ${entries.length} entries`)
    })
})

app.get('/api/persons', (_, res) => {
    Entry.find({}).then(entries => {
        res.json(entries)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Entry.findById(id).then(entry => {
        res.json(entry)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = Number(req.params.id)
    Entry.findByIdAndRemove(id)
        .then( () => {
            res.status(204)
        })
        .catch( err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const newEntry = req.body
    if(!newEntry.name){
        return res.status(400).json({
            error: 'entry does not contain name'
        })
    }
    if(!newEntry.number){
        return res.status(400).json({
            error: 'entry does not contain number'
        })
    }
    const entry = new Entry({
        name: newEntry.name,
        number: newEntry.number
    }) 
    entry.save()
        .then(note => {
            res.json(note)
        })
        .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const entry = {
        name: body.name,
        number: body.number
    }
    Entry.findByIdAndUpdate(req.params.id, entry, {new: true})
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(err => next(err))
})

const errorHandler = (err, req, res) => {
    console.error(`ERROR HANDLER: ${err.name}`)
    return res.status(400).send({error: 'ya goofed'})
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
