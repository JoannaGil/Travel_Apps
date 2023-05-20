//Creatin the improvised database to handle the informations we got
const alldata = {};

//Requiring express and other modules we need
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//creating the server using express
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


//tell the server what folder to use
app.use(express.static('dist'));

//get request to rout and send index.html file inside dist
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});

