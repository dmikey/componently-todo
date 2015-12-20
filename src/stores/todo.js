var
    todos = [];

module.exports = {
    viewstate: {},
    add: function(item) {
        todos.push(item);
        this.dispatch();
    },
    get: function() {
        return todos;
    },
    update: function(idx, props, nodraw) {
        for (var k in props) {
            todos[idx][k] = props[k];
        }
        this.dispatch(nodraw);
    },
    dispatch: function(nodraw){
        var e = new Event('todo-store-updated');
        e.nodraw = nodraw;
        e.store = this;
        document.dispatchEvent(e);
    }
}