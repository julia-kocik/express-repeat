const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');


router.get('/concerts', (req, res) => {
    res.json(db.concerts)
});

router.get('/concerts/random', (req, res) => {
    const random = Math.floor(Math.random() * db.concerts.length)
    res.json(db.concerts[random])
});

router.get('/concerts/:id', (req, res) => {
    db.concerts.find(elem => elem.id == req.params.id)
    res.json(db.concerts)
});

router.post('/concerts/', (req, res) => {
    db.concerts.push({id: uuidv4(), author: req.body.author, text: req.body.text})
    res.json(db.concerts);
});

router.put('/concerts/:id', (req, res) => {
    const id = db.concerts.find(elem => elem.id == req.params.id);
    if(!id) {
        res.json({message: "NOT OK"});
    } else {
        id.author = req.body.author
        id.text = req.body.text
        res.json(db.concerts);
    }
});

router.delete('/concerts/:id', (req, res) => {
    const index = db.concerts.findIndex(elem => elem.id != req.params.id);
    db.concerts.splice(index, 1)
    res.json(db.concerts);
});



module.exports = router;