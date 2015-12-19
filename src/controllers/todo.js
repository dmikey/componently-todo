document.addEventListener('click', function(event){
    var
        target = event.target;
    
    if(target.id === 'clear-completed') {
        console.log('clear the completed stuffs');
    }
    
}, false)