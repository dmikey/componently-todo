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