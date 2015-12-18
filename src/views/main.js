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