'use strict';

var
    component = require('chemical/component');

var
    templates = require('../templates');

var
    todo = require('./todo');

module.exports = function(data) {
    this.todo = todo;
    data.template = templates['templates/main.html'];
    component.call(this, data);
};
