'use strict';

module.exports = function (app) {
    const todoList = require('../app/controller');

    app.route('/')
        .get(todoList.index);

    app.route('/login')
        .get(todoList.login);

    app.route('/register')
        .post(todoList.register);

    app.route('/books')
        .get(todoList.books);

    app.route('/books/:book_id')
        .get(todoList.findBooks);

    app.route('/books')
        .post(todoList.createBook);

    app.route('/books')
        .put(todoList.updateBook);

    app.route('/books')
        .delete(todoList.deleteBook);
};