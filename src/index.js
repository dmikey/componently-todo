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