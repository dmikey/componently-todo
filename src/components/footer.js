'use strict';

var
    component = require('chemical/component');

var
    templates = require('../templates');

var
    controller = require('../controllers/todo');

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
            this[map[value]] = 'selected';
            
            var filter = (value === 'completed') ? value : '';
            if(value === 'all') {
                controller.filter();
            } else {
                controller.filter({status: filter});
            }
        };
        
        
    };

    data.template = templates['templates/footer.html'];
    component.call(this, data);
};