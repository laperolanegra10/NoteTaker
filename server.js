const express  = require('express');
const path = require('path');
const api = require('./routes/apiRoutes.js');


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// check to see if api needs to be changed to apiRoutes
app.use('/api, apiRoutes'); 

// html routes * check to see if 'public' needs to be listed.
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
}); 

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html')) 
});

app.get('*', (req,res) => {
    res.status(404) 
    res.sendFile(path.join(__dirname, 'publlic', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`App listening at port: ${PORT}`)
});