(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../templates":9,"chemical/base":11}],2:[function(require,module,exports){
'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

module.exports = function(data) {
    base.call(this, templates['templates/header.html'], data);
};

},{"../templates":9,"chemical/base":11}],3:[function(require,module,exports){
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

},{"../templates":9,"./todo":4,"chemical/base":11}],4:[function(require,module,exports){
'use strict';

var
    base = require('chemical/base');

var
    templates = require('../templates');

module.exports = function(data) {
    base.call(this, templates['templates/todo.html'], data);
};

},{"../templates":9,"chemical/base":11}],5:[function(require,module,exports){
module.exports = {
    ENTER_KEY: 13,
    ESCAPE_KEY: 27
};
},{}],6:[function(require,module,exports){
var
    constants = require('../constants');

var
    store = require('../stores/todo');

document.addEventListener('click', function (event) {
    var target = event.target;

    // clear completed items
    if (target.id === 'clear-completed') {
        console.log('clear the completed stuffs');
    }
    
    //if the toggle checked
    if(target.className.indexOf('toggle') > -1) {
        var li = target.parentNode.parentNode;
        
        if(target.checked) {
            li.className = 'completed';
        } else {
            li.className = ''; 
        }
    }
}, false);

window.addEventListener('keypress', function (event) {
    if (event.keyCode === constants.ENTER_KEY) {
       if('new-todo' === event.target.id) {
           //new todo
           var todo = event.target.value;
           store.add({label: todo});
           event.target.value = '';
           
           var e = new Event('todo-view-update');
           e.data = store.get();
           document.dispatchEvent(e);
       }
    }
}, false);

window.addEventListener('keyup', function (event) {
    if (event.keyCode === constants.ESCAPE_KEY) {
       
    }
}, false);
},{"../constants":5,"../stores/todo":8}],7:[function(require,module,exports){
/* chemical components for helpers */
var
    router = require('chemical/router');

/* render view */
var
    MainView = require('./views/main');

var
    target = document.querySelector('#todoapp');

MainView.renderInto(target);

router.intitialize(function (route) {
    //404
});


//application routes for todo
router.bind('/', function () {
    MainView.components.footer.setActiveFilter('all');
});

router.bind('/active', function () {
    MainView.components.footer.setActiveFilter('active');
});

router.bind('/completed', function () {
    MainView.components.footer.setActiveFilter('completed');
});


/* 
 * control router functions when hitting
 * the page for the first time 
 */
if (router.routes[location.pathname]) {
    router.routes[location.pathname]();
} else {
    var hash = location.hash.replace('#', '');
    router.change(hash);
}
},{"./views/main":10,"chemical/router":18}],8:[function(require,module,exports){
var
    todos = [];


module.exports = {
    add: function(item) {
        todos.push(item);
    },
    get: function() {
        return todos;
    }
}
},{}],9:[function(require,module,exports){
this["JST"] = this["JST"] || {};

this["JST"]["templates/footer.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<footer id="footer">\n    <span id="todo-count"></span>\n    <ul id="filters">\n        <li>\n            <a class="' +
((__t = ( data.allselected )) == null ? '' : __t) +
'" href="#/">All</a>\n        </li>\n        <li>\n            <a class="' +
((__t = ( data.activeselected )) == null ? '' : __t) +
'"  href="#/active">Active</a>\n        </li>\n        <li>\n            <a class="' +
((__t = ( data.completedselected )) == null ? '' : __t) +
'" href="#/completed">Completed</a>\n        </li>\n    </ul>\n    <button id="clear-completed">Clear completed</button>\n</footer>';
return __p
};

this["JST"]["templates/header.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<header id="header">\n    <h1>todos</h1>\n    <input id="new-todo" placeholder="What needs to be done?" autofocus>\n</header>';
return __p
};

this["JST"]["templates/main.html"] = function(data) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<section id="main">\n    <input id="toggle-all" type="checkbox">\n    <label for="toggle-all">Mark all as complete</label>\n    <ul id="todo-list">\n        ';
 if(data.content) { ;
__p += '\n            ';
 for(var i = 0; i < data.content.length; i++) { ;
__p += '\n                ';
 var todo = new this.todo({ content: data.content[i].label });  todo.setup();;
__p += '\n                ' +
((__t = ( todo.innerHTML )) == null ? '' : __t) +
'\n            ';
 } ;
__p += '\n        ';
 } ;
__p += '\n    </ul>\n</section>';
return __p
};

this["JST"]["templates/todo.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<li class="">\n    <div class="view">\n        <input type="checkbox" class="toggle">\n        <label>' +
((__t = ( data.content )) == null ? '' : __t) +
'</label>\n        <button class="destroy"></button>\n    </div>\n</li>';
return __p
};

var _ = {escape: escape};

module.exports =this["JST"];
},{}],10:[function(require,module,exports){
//import components
var Container = require('chemical/container');

var Header = require('../components/header'),
    Main = require('../components/main'),
    Todo = require('../components/todo'),
    Footer = require('../components/footer');

var Controller = require('../controllers/todo');


//declare and name components for exporting
//chemical does NOT do this by default, YOU decide
//when you need this
var components = {
        header:  new Header({}),
        main: new Main({
            content: []
        }),
        footer: new Footer({})
    };

//compose view
var container = new Container({
    components:[
        components.header,
        components.main,
        components.footer
    ]
});

document.addEventListener('todo-view-update', function(event){
    components.main.data({content: event.data});
}, false);

//we want to export our components
container.components = components;
module.exports = container;
},{"../components/footer":1,"../components/header":2,"../components/main":3,"../components/todo":4,"../controllers/todo":6,"chemical/container":13}],11:[function(require,module,exports){
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
        var
            redraw = false;
        /* setup template binding */
        for (var _k in this) {
            var d = _data[_k];
            if (d) {

                //if this object is the same
                //it's contents might be different
                //so we should request a redraw
                if(this[_k] === _data[_k]) {
                    redraw = true;
                }
                this[_k] = _data[_k];
            }
        }

        //prevents the possibility of the observer
        //firing and requesting a redraw
        if(redraw) {
            this.redraw();
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

    this.redraw = function () {
        console.log('redraw');

        if (this.parent) {
            this.parent.redraw();
        } else {
            var oldnode = this.node;
            this.setup();
            this.target.replaceChild(this.node, oldnode);
        }
    }

    observe(this, function (change) {
        if (change.name !== 'innerHTML' && change.name !== 'innerHTML' && change.name !== 'parent' && change.name !== 'node' && change.name !== 'fragment') {
            /* we need to update this widget alone if no parent */
            this.redraw();
        }
    }.bind(this))

};
},{"./lib/templates/index":14,"./lib/utils/document":16,"./lib/utils/observe":17}],12:[function(require,module,exports){
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
},{"./lib/utils/debounce":15,"./lib/utils/document":16}],13:[function(require,module,exports){
'use strict';

var
    Block = require('./block');

module.exports = function(data) {
    return new Block(data);
};

},{"./block":12}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
'use strict';

function router() {

    var routes = [];
    var unknown;

	/*
		@define: intializes the router class
		@requires: "func": {
			type: function,
			parameters: function(route),
			define: "this is used for when a hash is not found"
		}
		@example:
		var router = require('./router')
        router.intitialize(function(route) {
			console.log(route + 'not found');
		});
	*/
    var intitialize = function(func) {
        unknown = func;
        window.onhashchange = hashchange;
        hashchange();
    };

	/*
		@define: is called when a hash change occurs
		@requires: none
		@returns: none
	*/
    var hashchange = function() {
        var hash = window.location.hash.replace('#', '');
        if (routes[hash]) {
            routes[hash]();
        } else {
            unknown(hash);
        }
    };

	/*
		@define: binds hash events to global window.routes
		@requires: "hash": {type: String}
		@requires: "func": {type: Function}
		@example:
		var router = require('./router');
		router.bind('hello', function() {
			alert('hellow world');
		});
	*/
    var bind = function(hash, func) {
        if (typeof func === 'function') {
            routes[hash] = func;
        } else {
            throw new TypeError('func needs to be a function');
        }
    };

	/*
		@define: changes the hash of the window object
		@requires: "hash": {type: String}
		@example:
		var router = require('./router');
		router.change('hello');
	*/
    var change = function(hash) {
		/*
			This could happen if the user is already on a hash event
			and restarts the app
		 */
        if (location.href.substring(location.href.indexOf('#')) === '#' + hash) {
            hashchange();
        } else {
            location.href = '#' + hash;
        }
    };

    return {
        bind: bind,
        change: change,
        routes: routes,
        intitialize: intitialize
    };

}

var instance;
module.exports = instance = instance || router();

},{}]},{},[7]);