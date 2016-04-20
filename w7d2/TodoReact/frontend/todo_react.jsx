var TodoList = require('./components/todo_list'),
    React = require('react'),
    ReactDOM = require('react-dom');

var TodoLists = React.createClass({

  render: function(){

    return (
      <div>
        <TodoList />
      </div>
    );
  }

});


document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<TodoLists />, document.getElementById('root'));
});
