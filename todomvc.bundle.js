(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Copyright (c) 2014 Dan Stillman - MIT License - https://github.com/dstillman/pathparser.js */
!function(r){"function"==typeof define&&define.amd?define(r):"object"==typeof exports?module.exports=r():~String(this).indexOf("BackstagePass")?(EXPORTED_SYMBOLS=["PathParser"],PathParser=r()):PathParser=r()}(function(){"use strict";var r=function(r){this.rules=[],this.params=r};return r.prototype=function(){function r(r,t,e){for(var n={},s={},a=0;a<r.parts.length;a++){var i=r.parts[a],u=t[a];if(void 0!==u){if(":"==i.charAt(0)){n[i.substr(1)]=u;continue}if(i!==u)return!1}else{if(":"!=i.charAt(0))return!1;s[i.substr(1)]=!0}}for(var a=0;a<e.length;a++){var l=e[a].split("=",2),f=l[0];2!=l.length||n[f]||s[f]||(n[f]=l[1])}return n}return{add:function(r,t){this.rules.push({parts:r.replace(/^\//,"").split("/"),handler:t})},run:function(t){t.length&&(t=t.replace(/\/+/g,"/").replace(/^\/|\/($|\?)/,"").replace(/#.*$/,""));for(var e=t.split("?",2),n=e[0].split("/",50),s=e[1]?e[1].split("&",50):[],a=0;a<this.rules.length;a++){var i=this.rules[a],u=r(i,n,s);if(u){if(u.url=t,this.params)for(var l in u)this.params[l]=u[l];return i.handler&&i.handler.call(u),!0}}return!1}}}(),r});
},{}],2:[function(require,module,exports){
'use strict';

var
    component = require('componently');

var
    templates = require('../templates');

var
    controller = require('../controllers/todo');

module.exports = function (data) {
    this.allselected = data.allselected ? 'selected' : '';
    this.activeselected = data.allselected ? 'selected' : '';
    this.completedselected = data.allselected ? 'selected' : '';

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
            if (value === 'all') {
                controller.filter();
            } else {
                controller.filter({
                    status: filter
                });
            }
        };


    };

    this.template = templates['templates/footer.html'];
    component.call(this, data);
};
},{"../controllers/todo":7,"../templates":11,"componently":13}],3:[function(require,module,exports){
'use strict';

var
    component = require('componently');

var
    templates = require('../templates');

module.exports = function (data) {
    this.template = templates['templates/header.html'];
    component.call(this, data);
};
},{"../templates":11,"componently":13}],4:[function(require,module,exports){
'use strict';

var
    component = require('componently');

var
    templates = require('../templates');

module.exports = function (data) {
    this.template = templates['templates/main.html'];
    component.call(this, data);
};
},{"../templates":11,"componently":13}],5:[function(require,module,exports){
'use strict';

var
    component = require('componently');

var
    templates = require('../templates');

module.exports = function (data) {
    this.template = templates['templates/todo.html'];
    component.call(this, data);
};
},{"../templates":11,"componently":13}],6:[function(require,module,exports){
module.exports = {
    ENTER_KEY: 13,
    ESCAPE_KEY: 27
};
},{}],7:[function(require,module,exports){
var noop = function () {};
var constants = require('../constants');
var store = require('../stores/todo');

console.log('events');


// double click to edit a todo
document.addEventListener('dblclick', function (event) {
    var target = event.target;

    if (target.className.indexOf('todolabel') > -1) {
        // show the edit field
        var li = target.parentNode.parentNode;
        li.className += ' editing';

        // set focus to the input field
        var edit = li.querySelector('.edit');
        edit.focus();

        // remove the edit field when focus lost
        edit.addEventListener('focusout', function () {

            // remove this listener
            edit.removeEventListener('focusout');
            li.className = '';

            target.innerHTML = edit.value;
            store.update(li.getAttribute('data-index'), {
                label: edit.value
            }, false)
        });
    }
});

// click targets
document.addEventListener('click', function (event) {
    var target = event.target;

    // clear completed items
    if (target.id === 'clear-completed') {

        store.delete(store.find({
            status: 'completed'
        }));
        
        return;
    }

    if (target.id === 'toggle-all') {
        // get all todos from the store
        var todos = store.get();
        var status = target.checked ? 'completed' : '';

        // set view meta data we want before the store
        // notifies the view of updates to items
        store.viewstate.toggleall = target.checked ? 'checked' : '';

        // update all the todos to be completed
        for (var i = 0; i < todos.length; i++) {
            store.update(i, {
                status: status
            }, false)
        }

        store.dispatch();

        return;
    }

    // if the toggle checked
    if (target.className.indexOf('destroy') > -1) {
        // update the store
        var li = target.parentNode.parentNode;
        store.delete(li.getAttribute('data-index'));
    }

    // if the toggle checked
    if (target.className.indexOf('toggle') > -1) {

        // update the store
        var li = target.parentNode.parentNode;
        var status = target.checked ? 'completed' : '';

        // set the class on the DOM for animated strike through
        li.className = status;

        store.update(li.getAttribute('data-index'), {
            status: status
        }, false);

        store.viewstate.toggleall = false;
        if (store.length() === store.find({
                status: 'completed'
            }).length && store.length() !== 0) {

            store.viewstate.toggleall = true;
        }
        
        var toggleall = document.getElementById('toggle-all');
        if(store.viewstate.toggleall) {
            toggleall.setAttribute('checked','checked');
        } else if(toggleall.hasAttribute('checked')) {
            toggleall.removeAttribute('checked');
        }
    }
}, false);

// look for enter key
window.addEventListener('keypress', function (event) {
    if (event.keyCode === constants.ENTER_KEY) {
        if ('new-todo' === event.target.id) {
            //new todo
            var todo = event.target.value;
            store.add({
                label: todo
            });

            event.target.value = '';
        }
        
        if (event.target.className.indexOf('edit') > -1) {
            event.target.blur();    
        }
        
        return;
    }
}, false);

// check for escape key
window.addEventListener('keyup', function (event) {
    if (event.keyCode === constants.ESCAPE_KEY) {

    }
}, false);

// exportable api
module.exports = {
    filter: function (query) {
        if (query) {
            store.filter(query);
            store.dispatch();
        } else {
            store.filter();
            store.dispatch();
        }
    },
    translateTodos: function (todos) {
        // creates an array of todos from the store
        var ToDo = require('../components/todo');
        var components = [];
        for (var i = 0; i < todos.length; i++) {
            // create a todo item
            components.push(new ToDo({
                tag: 'li',
                attributes: {
                    'class': todos[i].status,
                    'data-index': todos[i].index
                },
                status: todos[i].status,
                content: todos[i].label
            }));
        }
        return components;
    }
};
},{"../components/todo":5,"../constants":6,"../stores/todo":10}],8:[function(require,module,exports){
// import helpers
var PathParser = require('pathparser');
var router = new PathParser;

// load the stored todos

var store = require('./stores/todo');
store.load();

// render view
var MainView = require('./views/main');
var target = document.querySelector('#todoapp');
MainView.renderInto(target);

router.add('/', function () {
    // set the filter which will also call the 
    // store dispatch
    MainView.$.footer.setActiveFilter('all');
});

router.add('/active', function () {
    MainView.$.footer.setActiveFilter('active');
});

router.add('/completed', function () {
    MainView.$.footer.setActiveFilter('completed');
});

function hashChange(){
    var hash = location.hash.replace('#', '');
    if (hash.length === 0) hash = '/';
    router.run(hash); 
}

window.onhashchange = hashChange;

hashChange();
},{"./stores/todo":10,"./views/main":12,"pathparser":1}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
var todos = [];
var lastquery;
var filter = void(0);
var name = 'todos-componently';
var debounce = require('../lib/debounce');

module.exports = {
    viewstate: {},
    filter: function (query) {
        if (!query) {
            filter = void(0);
            return;
        }

        filter = this.find(query);
        lastquery = query;
    },
    add: function (item) {
        item.status = '';
        todos.push(item);

        if (filter) {
            this.filter(lastquery);
        }

        this.save();
        this.dispatch();
    },
    length: function () {
        return todos.length;
    },
    get: function () {
        if (filter) {
            return filter;
        }
        return todos;
    },
    update: function (idx, props, notify) {
        for (var k in props) {
            todos[idx][k] = props[k];
        }

        this.save();

        if (filter) {
            filter = this.find(lastquery);
        }

        if (notify !== false) {
            this.dispatch();
        }
    },
    dispatch: debounce(function (nodraw) {
        var e = new Event('todo-store-updated');
        e.nodraw = nodraw;
        e.store = this;
        document.dispatchEvent(e);
    }, 80),
    delete: function (idx) {
        if (idx instanceof Array) {
            for (var i = idx.length - 1; i >= 0; i--) {
                todos.splice(idx[i].index, 1);
            }
        } else {
            todos.splice(idx, 1);
        }
        var e = new Event('todo-store-updated');
        e.store = this;
        this.save();
        
        if(filter) this.filter(lastquery);
        document.dispatchEvent(e);
    },
    save: function () {
        localStorage.setItem(name, JSON.stringify(todos));
    },
    load: function () {
        var json = localStorage.getItem(name);

        if (!json || json.length === 0) {
            todos = [];
            return;
        }

        todos = JSON.parse(json);
        if (!todos instanceof Array) {
            todos = [];
            return;
        }
    },
    find: function (query) {
        var results = [];
        for (var i = 0; i < todos.length; i++) {
            var todo = todos[i];
            var match = true;
            for (var k in query) {
                if (todo[k] !== query[k]) {
                    match = false;
                }
            }
            if (match) {
                todo.index = i;
                results.push(todo);
            }
        }
        return results;
    }
}
},{"../lib/debounce":9}],11:[function(require,module,exports){
this["JST"] = this["JST"] || {};

this["JST"]["templates/footer.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<footer id="footer" class="footer">\n    <span id="todo-count" class="todo-count"><strong>' +
((__t = ( data.itemsleft )) == null ? '' : __t) +
'</strong> items left</span>\n    <ul id="filters" class="filters">\n        <li>\n            <a class="' +
((__t = ( data.allselected )) == null ? '' : __t) +
'" href="#/">All</a>\n        </li>\n        <li>\n            <a class="' +
((__t = ( data.activeselected )) == null ? '' : __t) +
'"  href="#/active">Active</a>\n        </li>\n        <li>\n            <a class="' +
((__t = ( data.completedselected )) == null ? '' : __t) +
'" href="#/completed">Completed</a>\n        </li>\n    </ul>\n    <button id="clear-completed" class="clear-completed">Clear completed</button>\n</footer>';
return __p
};

this["JST"]["templates/header.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<header id="header" class="header">\n    <h1>todos</h1>\n    <input id="new-todo" class="new-todo" placeholder="What needs to be done?" autofocus>\n</header>';
return __p
};

this["JST"]["templates/main.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<section id="main" class="main">\n    <input id="toggle-all" class="toggle-all" type="checkbox" ' +
((__t = ( data.toggleall )) == null ? '' : __t) +
'>\n    <label for="toggle-all">Mark all as complete</label>\n    <ul id="todo-list" class="todo-list">\n        <!-- render components here -->\n        ' +
((__t = ( data.innerHTML )) == null ? '' : __t) +
'\n    </ul>\n</section>';
return __p
};

this["JST"]["templates/todo.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="view">\n    <input type="checkbox" class="toggle" ' +
((__t = ( data.status === 'completed' ? 'checked' : '' )) == null ? '' : __t) +
'>\n    <label class="todolabel">' +
((__t = ( data.content )) == null ? '' : __t) +
'</label>\n    <button class="destroy"></button>\n</div>\n<input class="edit" value="' +
((__t = ( data.content )) == null ? '' : __t) +
'">\n';
return __p
};

var _ = {escape: escape};

module.exports =this["JST"];
},{}],12:[function(require,module,exports){
//import components
var Component = require('componently');

var Header = require('../components/header'),
    Main = require('../components/main'),
    Todo = require('../components/todo'),
    Footer = require('../components/footer');

var Controller = require('../controllers/todo');

// declare and name components for exporting
// chemical does NOT do this by default, YOU decide
// when you need this
var components = {
    header: new Header({}),
    main: new Main({
        content: []
    }),
    footer: new Footer({
        itemsleft: 0
    })
};

// compose view
var container = new Component({
    components: [
        components.header,
        components.main,
        components.footer
    ]
});

document.addEventListener('todo-store-updated', function (event) {
    
    console.log('update')
    // listen for the store to be updated
    var store = event.store;
    var viewstate = store.viewstate;

    // toggle all view state
    viewstate.toggleall = false;
    if (store.length() === store.find({
            status: 'completed'
        }).length && store.length() !== 0) {
        // all items are checked or unchecked?

        viewstate.toggleall = true;
    }

    // update the view components
    components.footer.itemsleft = store.find({
        status: ''
    }).length;

    components.main.update({
        components: Controller.translateTodos(store.get()),
        toggleall: viewstate.toggleall ? 'checked' : ''
    });

    // ask the container to update it's DOM reference
    container.update();

    document.getElementById('new-todo').focus();
}, false);

// export reference to the components we need
container.$ = components;

// we want to export our components
module.exports = container;
},{"../components/footer":2,"../components/header":3,"../components/main":4,"../components/todo":5,"../controllers/todo":7,"componently":13}],13:[function(require,module,exports){
module.exports = function (data) {

    var document = typeof (window) === 'object' ? window.document : {
        createElement: function (type) {
            return {
                setAttribute: function () {}
            }
        }
    };

    // merge a passed object, to this
    this.data = function (data) {

        for (var k in data) {
            this[k] = data[k];
        };

        this.tag = this.tag || 'div';

        return this;
    };

    // update the components UI
    this.update = function (data) {
        this.oldnode = this.node;

        if (data) this.data(data);

        this.render();
        var target = this.target;

        if (target) {
            target.replaceChild(this.node, this.oldnode);
        }

        // run an after update hook if developer
        // needs to know when UI component is in the DOM
        if (this.afterUpdate) this.afterUpdate();
    }

    // setup this component
    this.render = function () {
        this.renderDOM();
        this.renderOuterHTML(this.innerHTML);

        // if a transform is present, allow the dev
        // to modify the outerHTML
        if(this.transform) this.outerHTML = this.transform();

        return this;
    };

    // render the html of this component
    this.renderHTML = function () {
        if (this.components) {
            this.innerHTML = this.renderComponents();
        };

        var template = this.template || function (data) {
            return data.innerHTML;
        };

        this.innerHTML = template(this);

        if(typeof this.innerHTML === 'function') {
            this.innerHTML = '(' + this.innerHTML.toString() + ')()';
        }

        return this.innerHTML;
    };

    // render the outer HTML for this element
    this.renderOuterHTML = function (html) {
        this.outerHTML = '';

        if (this.node.outerHTML) return this.node.outerHTML;

        this.outerHTML += '<' + this.tag;

        for (var k in this.attributes) {
            this.outerHTML += ' ';
            this.outerHTML += k + '="' + this.attributes[k] + '"';
        };

        this.outerHTML += '>';

        if (html) this.outerHTML += html;
        this.outerHTML += '</' + this.tag + '>';

        return this.outerHTML;
    };

    // render the DOM elements for this component
    this.renderDOM = function () {
        this.node = document.createElement(this.tag);

        for (var k in this.attributes) {
            this.node.setAttribute(k, this.attributes[k])
        };

        this.node.innerHTML = this.renderHTML();
        return this.node;
    };

    // render this component into a DOM target
    this.renderInto = function (target) {
        this.target = target;
        target.appendChild(this.renderDOM());
    };

    // render just the components
    this.renderComponents = function () {
        this.innerHTML = '';
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].parent = this;
            this.components[i].render();
            if (this.components[i].node.outerHTML) {
                // the innerHTML for a node is generated by the template
                this.innerHTML += this.components[i].node.outerHTML;
            } else {
                // the node path, we need to render the outer HTML
                // our selves, we'll use the innerHTML generated from the template
                this.innerHTML += this.components[i].renderOuterHTML(this.components[i].innerHTML);
            }
        };
        return this.innerHTML;
    };

    // destroy references
    this.destroy = function () {
        var target = this.target || this.parent;
        if (target) target.removeChild(this.node);
        this.node = void(0);
        this.innerHTML = void(0);
        if (this.components) this.destroyComponents();
    };

    // destroy component references
    this.destroyComponents = function () {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].parent = void(0);
            this.components[i].destroy();
        };
    };

    // setup this components lazy style `mixin`
    this.data(data);
};
},{}]},{},[8]);
