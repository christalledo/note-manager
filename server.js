const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001
const path = require('path')
const fs = require('fs');
const db = require('./db/db.json')

const { v4: uuidv4 } = require('uuid');

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }))

// route to render the index.html

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

//  route to render the notes.html

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// route to get all datas stored in db.json

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});


// route to update notes

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    const notes = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    db.push(notes);
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(db), () => {
        console.log("notes updated")
        res.json(db)
    })
});

// route to delete one note

app.delete('/api/notes/:id', (req, res) => {
    // fs.readFile("./db/db.json", (data, err))
    const newDb = db.filter((note) => {
        return note.id !== req.params.id;
    })
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newDb), () => {
        console.log("notes updated")
        res.json(newDb)
    })
});

// 

app.listen(PORT, () => {
    console.log(`The server is listening to ${PORT}`)
})