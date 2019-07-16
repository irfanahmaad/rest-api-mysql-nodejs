'use strict';

module.exports = function (app) {
    const todoList = require('../app/controller');

    app.route('/')
        .get(todoList.index);

    app.route('/books')
        .get(todoList.books);

    app.route('/books/:user_id')
        .get(todoList.findBooks);

    app.route('/books')
        .post(todoList.createBook);

    app.route('/books')
        .put(todoList.updateBook);

    app.route('/books')
        .delete(todoList.deleteBook);
};