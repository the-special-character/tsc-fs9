import React, { Component, createRef } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

export default class App extends Component {
  state = {
    todoList: [],
    filterType: 'all',
  };

  inputRef = createRef();

  addTodo = event => {
    event.preventDefault();
    const todoText = this.inputRef.current;

    this.setState(
      ({ todoList }) => ({
        todoList: [...todoList, { text: todoText.value, isDone: false, id: new Date().valueOf() }],
      }),
      () => {
        todoText.value = '';
      },
    );
  };

  toggleComplete = item => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(x => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          { ...todoList[index], isDone: !todoList[index].isDone },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = item => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(x => x.id === item.id);
      return {
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      };
    });
  };

  filterTodo = data => this.setState({ filterType: data });

  render() {
    console.log('render');
    const { todoList, filterType } = this.state;
    return (
      <main className="flex flex-col gap-4 min-h-screen">
        <h1 className="text-4xl font-bold text-center my-4">Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.inputRef} />
        <TodoList
          todoList={todoList}
          filterType={filterType}
          toggleComplete={this.toggleComplete}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter filterTodo={this.filterTodo} />
      </main>
    );
  }
}
