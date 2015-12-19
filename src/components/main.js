'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

var
    todo = require('./todo');

module.exports = function(data) {
    this.todo = todo;
    base.call(this, templates['templates/main.html'], data);
};
