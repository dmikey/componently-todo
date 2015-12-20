// import helpers
var router = require('chemical/router');

// render view
var MainView = require('./views/main');
var target = document.querySelector('#todoapp');

MainView.renderInto(target);


// application routes for todo
router.intitialize(function (route) {
    // 404
});

router.bind('/', function () {
    MainView.components.footer.setActiveFilter('all');
});

router.bind('/active', function () {
    MainView.components.footer.setActiveFilter('active');
});

router.bind('/completed', function () {
    MainView.components.footer.setActiveFilter('completed');
});


// controls first view
if (router.routes[location.pathname]) {
    router.routes[location.pathname]();
} else {
    var hash = location.hash.replace('#', '');
    router.change(hash);
}