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