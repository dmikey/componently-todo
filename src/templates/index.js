this["JST"] = this["JST"] || {};

this["JST"]["templates/footer.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<footer id="footer">\n    <span id="todo-count"><strong>' +
((__t = ( data.itemsleft )) == null ? '' : __t) +
'</strong> items left</span>\n    <ul id="filters">\n        <li>\n            <a class="' +
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
__p += '<section id="main">\n    <input id="toggle-all" type="checkbox" ' +
((__t = ( data.toggleall )) == null ? '' : __t) +
'>\n    <label for="toggle-all">Mark all as complete</label>\n    <ul id="todo-list">\n        ';
 if(data.content) { ;
__p += '\n            ';
 for(var i = 0; i < data.content.length; i++) { ;
__p += '\n                ';
 var todo = new this.todo({ index: i, content: data.content[i].label, status: data.content[i].status});  todo.setup();;
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
__p += '<li class="' +
((__t = ( data.status )) == null ? '' : __t) +
'" data-index="' +
((__t = ( data.index )) == null ? '' : __t) +
'">\n    <div class="view">\n        <input type="checkbox" class="toggle" ' +
((__t = ( data.status === 'completed' ? 'checked' : '' )) == null ? '' : __t) +
'>\n        <label>' +
((__t = ( data.content )) == null ? '' : __t) +
'</label>\n        <button class="destroy"></button>\n    </div>\n</li>';
return __p
};

var _ = {escape: escape};

module.exports =this["JST"];