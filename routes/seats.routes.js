const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');


router.get('/seats', (req, res) => {
    res.json(db.seats)
});

router.get('/seats/random', (req, res) => {
    const random = Math.floor(Math.random() * db.seats.length)
    res.json(db.seats[random])
});

router.get('/seats/:id', (req, res) => {
    db.seats.find(elem => elem.id == req.params.id)
    res.json(db.seats)
});

router.post('/seats/', (req, res) => {
    db.seats.push({id: uuidv4(), author: req.body.author, text: req.body.text})
    res.json(db.seats);
});

router.put('/seats/:id', (req, res) => {
    const id = db.seats.find(elem => elem.id == req.params.id);
    if(!id) {
        res.json({message: "NOT OK"});
    } else {
        id.author = req.body.author
        id.text = req.body.text
        res.json(db.seats);
    }
});

router.delete('/seats/:id', (req, res) => {
    const index = db.seats.findIndex(elem => elem.id != req.params.id);
    db.seats.splice(index, 1)
    res.json(db.seats);
});



module.exports = router;