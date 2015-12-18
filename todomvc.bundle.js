(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

module.exports = function(data) {
    base.call(this, templates['templates/footer.html'], data);
};

},{"../templates":6,"chemical/base":8}],2:[function(require,module,exports){
'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

module.exports = function(data) {
    base.call(this, templates['templates/header.html'], data);
};

},{"../templates":6,"chemical/base":8}],3:[function(require,module,exports){
'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

module.exports = function(data) {
    base.call(this, templates['templates/main.html'], data);
};

},{"../templates":6,"chemical/base":8}],4:[function(require,module,exports){
'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

module.exports = function(data) {
    base.call(this, templates['templates/todo.html'], data);
};

},{"../templates":6,"chemical/base":8}],5:[function(require,module,exports){
var
    MainView = require('./views/main');

var
    target = document.querySelector('#todoapp');

MainView.renderInto(target);
},{"./views/main":7}],6:[function(require,module,exports){
this["JST"] = this["JST"] || {};

this["JST"]["templates/footer.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<footer id="footer">\n    <span id="todo-count" data-hook="todo-count"></span>\n    <ul id="filters">\n        <li>\n            <a class="selected" href="#/" data-hook="all-mode">All</a>\n        </li>\n        <li>\n            <a href="#/active" data-hook="active-mode">Active</a>\n        </li>\n        <li>\n            <a href="#/completed" data-hook="completed-mode">Completed</a>\n        </li>\n    </ul>\n    <button id="clear-completed" data-hook="clear-completed">Clear completed</button>\n</footer>';

}
return __p
};

this["JST"]["templates/header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header id="header">\n    <h1>todos</h1>\n    <input id="new-todo" placeholder="What needs to be done?" data-hook="todo-input" autofocus>\n</header>';

}
return __p
};

this["JST"]["templates/main.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section id="main">\n    <input id="toggle-all" type="checkbox" data-hook="mark-all">\n    <label for="toggle-all">Mark all as complete</label>\n    <ul id="todo-list" data-hook="todo-container"></ul>\n</section>';

}
return __p
};

this["JST"]["templates/todo.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul id="todo-list" data-hook="todo-container">\n    <li class="">\n        <div class="view">\n            <input type="checkbox" data-hook="checkbox" class="toggle">\n            <label data-hook="title">k</label>\n            <button data-hook="action-delete" class="destroy"></button>\n        </div>\n        <input data-hook="input" class="edit" data-anddom-display="" data-anddom-hidden="true" style="display: none;">\n    </li>\n</ul>';

}
return __p
};

var _ = {escape: escape};

module.exports =this["JST"];
},{}],7:[function(require,module,exports){
var 
    Container = require('chemical/container');

var
    Header = require('../components/header'),
    Main = require('../components/main'),
    Todo = require('../components/todo'),
    Footer = require('../components/footer');

module.exports = new Container({
    components:[
        new Header({}),
        new Main({}),
        new Todo({}),
        new Footer({})
    ]
});
},{"../components/footer":1,"../components/header":2,"../components/main":3,"../components/todo":4,"chemical/container":10}],8:[function(require,module,exports){
'use strict';

var
    templates = require('./lib/templates/index'),
    document = require('./lib/utils/document'),
    observe = require('./lib/utils/observe');

module.exports = function (templatePath, data) {

    this.template = templates[templatePath] || templatePath;

    /* setup template binding */
    for (var k in data) {
        this[k] = data[k];
    }

    this.data = function (_data) {
        /* setup template binding */
        for (var _k in this) {
            var d = _data[_k];
            if (d) {
                this[_k] = _data[_k];
            }
        }
    };

    this.setup = function () {
        var fragment = document.createDocumentFragment();
        var element = document.createElement('div');

        /* setup the actual fragement to render */
        this.innerHTML = this.template.call(this, this);
        element.innerHTML = this.innerHTML;

        this.node = element.children[0] || element.child();
        fragment.appendChild(this.node);

        this.fragment = fragment;
    };

    this.renderInto = function (target) {
        this.target = target;
        this.setup();
        target.appendChild(this.node);
    };

    observe(this, function (change) {
        if (change.name !== 'innerHTML' && change.name !== 'innerHTML' && change.name !== 'parent' && change.name !== 'node' && change.name !== 'fragment') {
            /* we need to update this widget alone if no parent */
            if (this.parent) {
                this.parent.redraw();
            } else {
                var oldnode = this.node;
                this.setup();
                this.target.replaceChild(this.node, oldnode);
            }
        }
    }.bind(this))

};
},{"./lib/templates/index":11,"./lib/utils/document":13,"./lib/utils/observe":14}],9:[function(require,module,exports){
'use strict';

var
    debounce = require('./lib/utils/debounce'),
    document = require('./lib/utils/document');

module.exports = function (data) {

    var
        components = (data && data.components) || [];

    var
        target;

    this.renderInto = function (_target) {
        target = target || _target;

        // verify if there is an old node for this block
        var oldnode = this.node;

        this.setup();

        // if there is a target, render into target
        // if there is a target, render into target
        if (target) {
            if (oldnode && oldnode.parentNode === target) {
                target.removeChild(oldnode);
                target.appendChild(this.container);
            } else {
                target.appendChild(this.container);
            }
        } else {
            // otherwise render into the parent node
            // (another block rendering inside a block)
            /* eslint no-lonely-if: 0 */
            if (oldnode) {
                this.parent.node.replaceChild(this.container, oldnode);
            } else {
                this.parent.node.appendChild(this.container);
            }
        }
    };

    this.setup = function () {

        // if there is a tag for the container element
        // otherwise default to div
        data.tag = data.tag || 'div';
        data.classes = data.classes || '';
        data.style = data.style || '';

        // for server side rendering
        // todo: clean this up
        this.innerHTML = '<' + data.tag + ' class="' + data.classes + '" style="' + data.style + '">';

        // create a container and a fragement to hold the container
        var
            fragment = document.createDocumentFragment(),
            container = document.createElement(data.tag);

        // add the block's components to the container
        for (var i = 0, len = components.length; i < len; i++) {
            components[i].parent = this;
            components[i].setup();
            this.innerHTML += components[i].innerHTML;
            container.appendChild(components[i].fragment);
        }

        // add the container to a fragment
        fragment.appendChild(container);

        // give access to the fragement and container
        this.fragment = fragment;
        this.container = container;

        this.innerHTML += '</' + data.tag + '>';

        // did the user give a class to give to the container element?
        if (data.classes && data.classes.length > 0) {
            this.container.className += data.classes;
        }

        if (data.style) {
            this.container.style.cssText = data.style;
        }

        // set this objects node to container, so that a container can easily contain
        // a container
        this.node = container;
    };

    this._draw = function (component) {
        component.remove();
        component.renderInto(target);
    };

    var draw = debounce(this._draw.bind(this), 150);

    this.redraw = function () {
        draw(this);
    };

    this.remove = function () {
        for (var i = 0, len = components.length; i < len; i++) {

            // if a child is a container, have the container remove
            // it's own nodes
            if (components[i].remove) {
                components[i].remove();
            }

            components[i].parent.node.removeChild(components[i].node);
        }
    };
};
},{"./lib/utils/debounce":12,"./lib/utils/document":13}],10:[function(require,module,exports){
'use strict';

var
    Block = require('./block');

module.exports = function(data) {
    return new Block(data);
};

},{"./block":9}],11:[function(require,module,exports){
this["JST"] = this["JST"] || {};

this["JST"]["anchor.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<a class="chemical-anchor" href="' +
((__t = ( data.href )) == null ? '' : __t) +
'">' +
((__t = ( data.content )) == null ? '' : __t) +
'</a>';
return __p
};

this["JST"]["button.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<button id="' +
((__t = ( data.id )) == null ? '' : __t) +
'" class="chemical-button ' +
((__t = ( data.block )) == null ? '' : __t) +
' ' +
((__t = ( data.brand )) == null ? '' : __t) +
'">\n    ' +
((__t = ( data.content )) == null ? '' : __t) +
'\n</button>';
return __p
};

this["JST"]["image.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<img src="' +
((__t = ( data.src )) == null ? '' : __t) +
'" class="chemical-image ' +
((__t = ( data.responsive )) == null ? '' : __t) +
'">';
return __p
};

this["JST"]["input.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<input class="' +
((__t = ( data.block )) == null ? '' : __t) +
'" type="' +
((__t = ( data.type )) == null ? '' : __t) +
'" placeholder="' +
((__t = ( data.placeholder )) == null ? '' : __t) +
'">';
return __p
};

this["JST"]["progress.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="chemical-progress">\n    <div style="width: ' +
((__t = ( data.value )) == null ? '' : __t) +
'%; height:15px;" class="chemical-progress-fill ' +
((__t = ( data.brand )) == null ? '' : __t) +
'"></div>\n</div>\n';
return __p
};

this["JST"]["spinner.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="chemical-overlay" style="height:100%;">\n    <div class="chemical-spinner ' +
((__t = ( data.brand )) == null ? '' : __t) +
'"></div>\n</div>\n';
return __p
};

this["JST"]["table.html"] = function(data) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table id="' +
((__t = ( data.id )) == null ? '' : __t) +
'" class="chemical-table ' +
((__t = ( data.striped )) == null ? '' : __t) +
' ' +
((__t = ( data.responsive )) == null ? '' : __t) +
' ' +
((__t = ( data.brand )) == null ? '' : __t) +
' ' +
((__t = ( data.bordered )) == null ? '' : __t) +
'">\n   ';
 if(data.content) { ;
__p += '\n        ';
 for(var i = 0; i < data.content.length; i++) { ;
__p += '\n            <tr>\n            ';
 for(var key in data.content[i]) { ;
__p += '\n                <th>';
 print(data.content[i][key]) ;
__p += '</th>\n            ';
 } ;
__p += '\n            </tr>\n        ';
 } ;
__p += '\n    ';
 } ;
__p += '\n</table>\n';
return __p
};

this["JST"]["text.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="chemical-text ' +
((__t = ( data.brand )) == null ? '' : __t) +
'">' +
((__t = ( data.content )) == null ? '' : __t) +
'</div>';
return __p
};

var _ = {escape: escape};

module.exports =this["JST"];
},{}],12:[function(require,module,exports){
module.exports = function(fn, delay) {
  var timer = null;
  var firstRun = true;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
},{}],13:[function(require,module,exports){
/*
    server side fill, for document
    module uses, help us build robust server rendered
    pages from the same views as we use for client side
 */

// server side fill, for document
// module uses, help us build robust server rendered
// pages from the same views as we use for client side
var fill = {
    createDocumentFragment: function () {
        if (typeof window === 'object') {
            return window.document.createDocumentFragment();
        } else {
            var children = [];
            return {
                appendChild: function (child) {
                    children.push(child);
                }
            }
        }
    },
    createElement: function (type) {
        if (typeof window === 'object') {
            return window.document.createElement(type);
        } else {
            var children = [];
            return {
                children: [
                  void(0)
                ],
                child: function () {
                    return this.innerHTML;
                },
                appendChild: function (child) {
                    children.push(child);
                },
                removeChild: function (child) {},
                replaceChild: function (child) {},
                style: {
                    cssText: ''
                }
            }
        }

    }
};

module.exports = fill;
},{}],14:[function(require,module,exports){
module.exports = function(obj, cb, data) {

     /* leaving this off of node side for right now */
    if (Object.observe && (!data || (data && !data.test))) {
        /* when the model is updated, change the values in dom */
        Object.observe(obj, function (changes) {
            changes.forEach(function (change) {
                cb(change);
            }.bind(this));
        }.bind(this));
    }

    if (!Object.observe || (data && data.test)) {
        console.warn('Observables not supports, please polyfill');
    }
}
},{}]},{},[5]);
