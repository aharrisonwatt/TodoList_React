var React = require('react');
var TodoStore = require('../stores/todo_store');

var TodoList = React.createClass({
  setInitialState: function(){
    return {
      todoLists: TodoStore.all()
    };
  },

  render: function(){

    return(
      <div>
        <ul>
          {
            this.state.todoLists.map (function(el) {
              return <li key={el.id}> el.title </li>;
            })
          }
        </ul>
      </div>
    );
  }


});

module.exports = TodoList;
