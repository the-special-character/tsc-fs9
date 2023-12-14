import React, { Component } from 'react';

export default class App extends Component {
  state = {
    todoText: '',
    todoList: [],
  };

  changeText = event => {
    console.log(event.target.value);
    this.setState({ todoText: event.target.value });
  };

  addTodo = event => {
    event.preventDefault();
    this.setState(({ todoText, todoList }) => ({
      todoList: [...todoList, { text: todoText, isDone: false, id: new Date().valueOf() }],
      todoText: '',
    }));
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

  render() {
    const { todoText, todoList } = this.state;
    return (
      <main className="flex flex-col gap-4 min-h-screen">
        <h1 className="text-4xl font-bold text-center my-4">Todo App</h1>
        <form className="flex justify-center mx-2" onSubmit={this.addTodo}>
          <div>
            <label htmlFor="todoText" className="sr-only">
              Todo Text
            </label>
            <input
              type="text"
              id="todoText"
              className="rounded-l-md"
              value={todoText}
              onChange={this.changeText}
            />
          </div>
          <button
            type="submit"
            className="rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="line-clamp-1">Add Todo</span>
          </button>
        </form>
        <section id="todoList" className="flex flex-col gap-4 mx-2 flex-1">
          {todoList.map(x => (
            <section id="listItem1" className="flex items-center">
              <div>
                <label htmlFor="toggleComplete" className="sr-only">
                  Toggle Complete
                </label>
                <input
                  type="checkbox"
                  name="toggleComplete"
                  id="toggleComplete"
                  checked={x.isDone}
                  onChange={() => this.toggleComplete(x)}
                />
              </div>
              <p className={`flex-1 px-4 line-clamp-2 ${x.isDone ? 'line-through' : ''}`}>
                {x.text}
              </p>
              <button type="button" className="btn">
                Delete
              </button>
            </section>
          ))}
        </section>
        <section id="filterTodo" className="flex">
          <button type="button" className="btn rounded-none flex-1">
            All
          </button>
          <button type="button" className="btn rounded-none flex-1">
            Pending
          </button>
          <button type="button" className="btn rounded-none flex-1">
            Completed
          </button>
        </section>
      </main>
    );
  }
}
