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