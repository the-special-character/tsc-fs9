import React, { Component } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Checkbox } from './components/ui/checkbox';

export default class Todo extends Component {
  //   static propTypes = {second: third}

  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      todoText: '',
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:3000/todoList');
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {
      console.log(error);
    }
  }

  addTodo = async (e) => {
    e.preventDefault();
    try {
      const { todoText } = this.state;
      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text: todoText,
          isDone: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      this.setState(({ todoList }) => ({
        todoList: [json, ...todoList],
        todoText: '',
      }));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { todoList, todoText } = this.state;
    return (
      <div className="flex flex-col h-screen">
        <h1 className="text-center m-4">Todo App</h1>
        <form className="flex justify-center my-10" onSubmit={this.addTodo}>
          <div>
            <Label htmlFor="todoText" className="sr-only">
              Todo Text
            </Label>
            <Input
              id="todoText"
              placeholder="Enter your todo here..."
              className="rounded-r-none"
              value={todoText}
              onChange={(e) => {
                this.setState({ todoText: e.target.value });
              }}
            />
          </div>
          <Button type="submit" className="rounded-l-none">
            Add Todo
          </Button>
        </form>
        <div className="flex-1">
          {todoList.map((item) => (
            <div className="flex items-center m-4">
              <div>
                <Label htmlFor="toggleComplete" className="sr-only">
                  Toggle Complete Todo
                </Label>
                <Checkbox id="toggleComplete" checked={item.isDone} />
              </div>
              <p className="!m-0 flex-1 px-4 line-clamp-1">{item.text}</p>
              <Button type="button">Delete Todo</Button>
            </div>
          ))}
        </div>
        <div className="flex">
          <Button className="rounded-none flex-1">All</Button>
          <Button className="rounded-none flex-1">Pending</Button>
          <Button className="rounded-none flex-1">Completed</Button>
        </div>
      </div>
    );
  }
}
