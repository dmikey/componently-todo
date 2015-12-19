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