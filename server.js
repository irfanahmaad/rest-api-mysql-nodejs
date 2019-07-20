const express = require('express'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    app = express(),
    controller = require('./app/controller')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const routes = require('./routes/router')
app.use(express.static('public'));
app.set('view engine', 'ejs');
routes(app)

app.listen(8000)