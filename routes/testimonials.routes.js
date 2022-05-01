const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');


router.get('/testimonials', (req, res) => {
    res.json(db.testimonials)
});

router.get('/testimonials/random', (req, res) => {
    const random = Math.floor(Math.random() * db.testimonials.length)
    res.json(db.testimonials[random])
});

router.get('/testimonials/:id', (req, res) => {
    db.testimonials.find(elem => elem.id == req.params.id)
    res.json(db.testimonials)
});

router.post('/testimonials/', (req, res) => {
    db.testimonials.push({id: uuidv4(), author: req.body.author, text: req.body.text})
    res.json(db.testimonials);
});

router.put('/testimonials/:id', (req, res) => {
    const id = db.testimonials.find(elem => elem.id == req.params.id);
    if(!id) {
        res.json({message: "NOT OK"});
    } else {
        id.author = req.body.author
        id.text = req.body.text
        res.json(db.testimonials);
    }
});

router.delete('/testimonials/:id', (req, res) => {
    const index = db.testimonials.findIndex(elem => elem.id != req.params.id);
    db.testimonials.splice(index, 1)
    res.json(db.testimonials);
});



module.exports = router;