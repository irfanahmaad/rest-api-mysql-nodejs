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

    app.route('/book/:book_id')
        .get(todoList.findBook);

    app.route('/book')
        .post(todoList.createBook);

    app.route('/book/:book_id')
        .put(todoList.updateBook);

    app.route('/book/:book_id')
        .delete(todoList.deleteBook);
};