'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

module.exports = function(data) {
    base.call(this, templates['templates/todo.html'], data);
};
