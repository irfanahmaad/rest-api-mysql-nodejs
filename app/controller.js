'use strict'

const response = require('../response/res')
const connection = require('../conf/connection')

exports.index = function (req, res) {
    response.ok("Go to another stuff!", res)
}

exports.books = function (req, res) {
    connection.query('SELECT * FROM book', function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}


exports.findBooks = function (req, res) {

    const book_id = req.params.book_id

    connection.query('SELECT * FROM books where id = ?',
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

    connection.query('INSERT INTO books (name, author, image, description) values (?,?)',
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

    const book_id = req.body.book_id;
    const name = req.body.name
    const author = req.body.author
    const image = req.body.image
    const description = req.body.description

    connection.query('UPDATE books SET name = ?, author = ?, image = ?, description = ? WHERE id = ?',
        [name, author, image, description, user_id],
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

    connection.query('DELETE FROM books WHERE id = ?',
        [book_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Book deleted!", res)
            }
        });
};