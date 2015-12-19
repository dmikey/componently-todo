var
    todos = [];

module.exports = {
    add: function(item) {
        todos.push(item);
    },
    get: function() {
        return todos;
    },
    update: function(idx, props) {
        for (var k in props) {
            todos[idx][k] = props[k];
        }
        var e = new Event('todo-store-updated');
        e.data = todos;
        document.dispatchEvent(e);
    }
}