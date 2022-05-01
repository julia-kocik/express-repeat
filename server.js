const express = require('express');
const { v4: uuidv4 } = require('uuid');

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/testimonials', (req, res) => {
    res.json(db)
});

app.get('/testimonials/random', (req, res) => {
    const random = Math.floor(Math.random() * db.length)
    res.json(db[random])
});

app.get('/testimonials/:id', (req, res) => {
    db.find(elem => elem.id == req.params.id)
    res.json(db)
});

app.post('/testimonials/', (req, res) => {
    db.push({id: uuidv4(), author: req.body.author, text: req.body.text})
    res.json(db);
});

app.put('/testimonials/:id', (req, res) => {
    const id = db.find(elem => elem.id == req.params.id);
    if(!id) {
        res.json({message: "NOT OK"});
    } else {
        id.author = req.body.author
        id.text = req.body.text
        res.json(db);
    }
});

app.delete('/testimonials/:id', (req, res) => {
    const index = db.findIndex(elem => elem.id != req.params.id);
    db.splice(index, 1)
    res.json(db);
});

app.use((req, res) => {
    res.status(404).send({ message: "Not found..." });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});