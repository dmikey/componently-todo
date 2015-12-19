'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

module.exports = function (data) {
    data.allselected = data.allselected ? 'selected' : '';
    data.activeselected = data.allselected ? 'selected' : '';
    data.completedselected = data.allselected ? 'selected' : '';

    this.setActiveFilter = function (value) {
        var map = {
            active: 'activeselected',
            all: 'allselected',
            completed: 'completedselected'
        };

        if (map[value]) {
            this.allselected = '';
            this.activeselected = '';
            this.completedselected = '';
            this[map[value]] = 'selected'
        };
    };

    base.call(this, templates['templates/footer.html'], data);
};