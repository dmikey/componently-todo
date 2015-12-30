'use strict';

var
    component = require('chemical/component');

var
    templates = require('../templates');

module.exports = function(data) {
    data.template = templates['templates/todo.html']; 
    component.call(this, data);
};
