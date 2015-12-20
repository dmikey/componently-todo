//import components
var Container = require('chemical/container');

var Header = require('../components/header'),
    Main = require('../components/main'),
    Todo = require('../components/todo'),
    Footer = require('../components/footer');

var Controller = require('../controllers/todo');


// declare and name components for exporting
// chemical does NOT do this by default, YOU decide
// when you need this
var components = {
        header:  new Header({}),
        main: new Main({
            content: []
        }),
        footer: new Footer({
            itemsleft: 0
        })
    };

// debugging 
window.main = components.main;

// compose view
var container = new Container({
    components:[
        components.header,
        components.main,
        components.footer
    ]
});

document.addEventListener('todo-store-updated', function(event){
    var store = event.store;
    var viewstate = store.viewstate;
    
    components.footer.itemsleft = 10;
    components.main.toggleall = viewstate.toggleall ? 'checked' : '';
    components.main.data({content: store.get()}, event.nodraw);
}, false);

//we want to export our components
container.components = components;
module.exports = container;