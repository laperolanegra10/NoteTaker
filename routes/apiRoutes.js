const router = require('express').Router();
const fs = require('fs');
const db = require('../db');
const uuid = require('uuid');

// Api Routes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
})

router.post('/notes', (req,rec) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    };
    const readNote= fs.readFileSync('./db/db.json');

    const parseNote = JSON.parsing(readNote); 

    parseNote.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(parseNote));
});

router.delete('')

module.exports = router