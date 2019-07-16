const express = require('express'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    app = express(),
    controller = require('./app/controller')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./routes/router')
routes(app)

app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'novel_katalog'
    });
    res.locals.connect()
    next()
})

app.listen(3000)