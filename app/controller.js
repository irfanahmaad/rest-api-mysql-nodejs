'use strict'

const response = require('../response/res')
const connection = require('../conf/connection')
const crypto = require('crypto')

exports.index = function (req, res) {
    response.ok("Go to another stuff!", res)
}

exports.login = function (req, res) {
    const email = req.body.email
    const password = crypto.createHash('md5').update(req.body.password).digest("hex")

    connection.query('SELECT * FROM users where email = ? and password = ?',
        [email, password],
        function (error, rows, fields) {
            if (rows.length > 0) {
                response.ok(rows, res)
            } else {
                response.ok("gagal", res)
            }
        })
}

exports.register = function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = crypto.createHash('md5').update(req.body.password).digest("hex")

    connection.query('INSERT INTO users (name, email, password) VALUES (?,?,?)',
        [name, email, password],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("User added!", res)
            }
        })
}

exports.books = function (req, res) {
    connection.query('SELECT * FROM book', function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok("book added!", res)
        }
    })
}

exports.findBooks = function (req, res) {

    const book_id = req.params.book_id

    connection.query('SELECT * FROM book where id = ?',
        [book_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        })
}

exports.createBook = function (req, res) {

    const name = req.body.name
    const author = req.body.author
    const image = req.body.image
    const description = req.body.description

    connection.query('INSERT INTO book (name, author, image, description) values (?,?,?,?)',
        [name, author, image, description],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Book added!", res)
            }
        })
}

exports.updateBook = function (req, res) {

    const book_id = req.body.book_id
    const name = req.body.name
    const author = req.body.author
    const image = req.body.image
    const description = req.body.description

    connection.query('UPDATE book SET name = ?, author = ?, image = ?, description = ? WHERE id = ?',
        [name, author, image, description, book_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Book updated!", res)
            }
        })
}

exports.deleteBook = function (req, res) {

    const book_id = req.body.book_id;

    connection.query('DELETE FROM book WHERE id = ?',
        [book_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Book deleted!", res)
            }
        });
};