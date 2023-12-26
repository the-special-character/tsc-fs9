import React, { Component, createRef } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

// mounting
// -> contructot
// -> getDerivedFromProps
// -> render
// -> componentDidMount

// updating

//  -> getDerivedFromProps
// -> shouldComponentUpdate / PureComponent
//  ->render
//  -> getSnapshotBeforeUpdate
// -> componentDidUpdate

// unmounting
// -> componentWillUnmount

export default class App extends Component {
  state = {
    todoList: [],
    filterType: 'all',
    formError: null,
  };

  inputRef = createRef();

  componentDidMount() {
    this.loadTodo('all');
  }

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error, info) {
    console.log(info.componentStack);
  }

  loadTodo = async filterType => {
    try {
      let url = 'http://localhost:3004/todo-list';
      if (filterType !== 'all') {
        url += `?isDone=${filterType === 'completed'}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      this.setState({ todoList: json, filterType });
    } catch (error) {}
  };

  addTodo = async event => {
    try {
      event.preventDefault();
      const todoText = this.inputRef.current;
      if (!todoText.value) throw new Error('Please Enter valid todo text');

      const res = await fetch('http://localhost:3004/todo-list', {
        method: 'POST',
        body: JSON.stringify({
          isDone: false,
          text: todoText.value,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();

      this.setState(
        ({ todoList }) => ({
          todoList: [...todoList, json],
        }),
        () => {
          todoText.value = '';
        },
      );
    } catch (error) {
      this.setState({ formError: error });
    }
  };

  toggleComplete = async item => {
    try {
      const res = await fetch(`http://localhost:3004/todo-list/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...item,
          isDone: !item.isDone,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();

      this.setState(({ todoList }) => {
        const index = todoList.findIndex(x => x.id === item.id);
        return {
          todoList: [...todoList.slice(0, index), json, ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {}
  };

  deleteTodo = async item => {
    try {
      // throw new Error('something went wrong...');
      await fetch(`http://localhost:3004/todo-list/${item.id}`, {
        method: 'DELETE',
      });
      this.setState(({ todoList }) => {
        const index = todoList.findIndex(x => x.id === item.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { todoList, filterType } = this.state;
    const { formError } = this.state;

    console.log(formError);
    return (
      <main className="flex flex-col gap-4 min-h-screen">
        <h1 className="text-4xl font-bold text-center my-4">Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.inputRef} />
        {formError && <p className="text-red-400 text-sm text-center">{formError.message}</p>}

        <TodoList
          todoList={todoList}
          filterType={filterType}
          toggleComplete={this.toggleComplete}
          deleteTodo={this.deleteTodo}
        />

        <TodoFilter filterTodo={this.loadTodo} />
      </main>
    );
  }
}
