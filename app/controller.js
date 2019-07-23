'use strict'

const response = require('../response/res')
const connection = require('../conf/connection')
const crypto = require('crypto')
const path = require('path')
const Resize = require('../conf/Resize')
const base_url = require('../conf/base_url')

exports.index = async function (req, res) {
    response.ok("Go to another stuff!", res)
}

exports.login = async function (req, res) {
    const email = req.body.email
    const password = crypto.createHash('md5').update(req.body.password).digest("hex")

    connection.query('SELECT * FROM users where email = ? and password = ?',
        [email, password],
        function (error, rows, fields) {
            if (rows.length > 0) {
                response.ok(rows[0], res)
            } else {
                response.ok("gagal", res)
            }
        })
}

exports.register = async function (req, res) {
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

exports.books = async function (req, res) {
    connection.query('SELECT * FROM books', function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

exports.findBook = async function (req, res) {

    const book_id = req.params.book_id

    connection.query('SELECT * FROM books where id = ?',
        [book_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows[0], res)
            }
        })
}

exports.createBook = async function (req, res) {
    const imagePath = path.join(__dirname, '../public/images');
    const fileUpload = new Resize(imagePath);

    if (!req.file) {
        res.status(401).json({ error: 'Please provide an image' });
    }

    const name = req.body.name
    const author = req.body.author
    const description = req.body.description

    const filename = await fileUpload.save(req.file.buffer);

    connection.query('INSERT INTO books (name, author, image, description) values (?,?,?,?)',
        [name, author, base_url.upload_path + filename, description],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Book added!", res)
            }
        })
}

exports.updateBook = async function (req, res) {
    const imagePath = path.join(__dirname, '../public/images')
    const fileUpload = new Resize(imagePath)

    if (!req.file) {
        res.status(401).json({ error: 'Please provide an image' })
    }

    const book_id = req.params.book_id
    const name = req.body.name
    const author = req.body.author
    const description = req.body.description

    const filename = await fileUpload.save(req.file.buffer)

    connection.query('UPDATE books SET name = ?, author = ?, image = ?, description = ? WHERE id = ?',
        [name, author, base_url.upload_path + filename, description, book_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Book updated!", res)
            }
        })
}

exports.deleteBook = async function (req, res) {

    const book_id = req.params.book_id;

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