const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

// Api Routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
})

router.post('/', (req,res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    };
    const readNote= fs.readFileSync('./db/db.json');

    const parseNote = JSON.parse(readNote); 

    parseNote.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(parseNote));
    res.json(newNote);
});

router.delete('/:id', (req, res) => {
    const readNote = fs.readFileSync('./db/db.json');
    const parsedNote = JSON.parse(readNote);
   const found = parsedNote.some(note => note.id !== req.params.id);
   
   if (found) {
       fs.writeFileSync('./db/db.json', JSON.stringify(parsedNote.filter(note => note.id !== req.params.id,), null, 4))
       res.json({
           message: 'Note Has Been Demolished!',
           notes: parsedNote.filter(note => note.id !== req.params.id)
       });
   } else {
       res.status(400).json({message: `Note with the id ${req.params.id} found`});
   }
});

module.exports = router;