const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Set static files folder
app.use(express.static('client'));

// Routes
app.use("/api", require('./api/routes'));

// Serve index.html
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
})

// Start web server
let server = app.listen(8000, function () {
    let host = server.address().address
    let port = server.address().port

    console.log(`Example app listening at http://${host !== '::' ? host : 'localhost'}:${port}`)

})