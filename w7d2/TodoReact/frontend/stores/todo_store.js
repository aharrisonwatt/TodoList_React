var _todos = {};
var _callbacks = [];

var TodoStore = {

  changed: function(){
    for (var i = 0; i < _callbacks.length; i++) {
      _callbacks[i]();
    }
  },

  addChangedHandler: function(callback){
    _callbacks.push(callback);
  },

  removeChangedHandler: function(callback) {
    for (var i = 0; i < _callbacks.length; i++) {
      if(_callbacks[i] === callback){
        _callbacks.splice(i, 1);
        return;
      }
    }
  },

  all: function() {
    var todosArray = [];

    for (var key in _todos){
      todosArray.push(_todos[key]);
    }

    return todosArray;
  },

  resetTodo: function(todos){
    var updatedTodos = {};

    for (var i = 0; i < todos.length; i++) {
      var currentTodo = todos[i];
      updatedTodos[currentTodo.id] = currentTodo;
    }
    _todos = updatedTodos;
  },

  addTodo: function(todo) {
    _todos[todo.id] = todo;
  },

  removeTodo: function(id) {
    delete _todos[id];
  },

  fetch: function() {
    $.ajax({
      url: "/api/todos",
      method: "Get",
      success: function(todos){
        TodoStore.resetTodo(todos);
        TodoStore.changed();
      }
    });
  },

  create: function(todoData) {
    var store = this;
    $.ajax({
      url: "/api/todos",
      method: "Post",
      data: {todo: todoData},
      success: function(response){
        store.addTodo(response);
        store.changed();
      }
    });
  },

  destroy: function(id){
    var store = this;

    if (_todos[id]){
      $.ajax({
        url: "/api/todos/" + id,
        method: "Delete",
        success: function(){
          store.removeTodo(id);
          store.changed();
        }
      });

    }
  },

  toggleDone: function(id){
    var store = this;
    if (_todos[id].done === true){
      var updateData = {todo: {done: false}};
    }else {
      var updateData = {todo: {done: true}};
    }
    $.ajax({
      url: "/api/todos/" + id,
      method: "Patch",
      data: {todo: updateData},
      success: function(todo){
        store.addTodo(todo);
        store.changed();
      }
    });

  }

};

module.exports = TodoStore;
