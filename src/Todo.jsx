import React, { Component, createRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './components/ui/alert-dialog';

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
      filterType: 'all',
      apiState: [],
    };
    this.inputRef = createRef();
  }

  async componentDidMount() {
    this.loadTodo('all');
  }

  loadTodo = async (filterType) => {
    const type = 'LOAD_TODO';
    try {
      this.setState(({ apiState }) => ({
        apiState: [
          ...apiState,
          {
            type,
            state: 'LOADING',
            message: 'Todo Date is loading...',
          },
        ],
      }));

      let url = 'http://localhost:3000/todoList';
      if (filterType !== 'all') {
        url += `?isDone=${filterType === 'completed' ? 1 : 0}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      // this.setState({ todoList: json, filterType });
      this.setState(({ apiState }) => {
        const index = apiState.findIndex((x) => x.type === type);
        return {
          todoList: json,
          filterType,
          apiState: [apiState.slice(0, index), apiState.slice(index + 1)],
        };
      });
    } catch (error) {
      this.setState(({ apiState }) => {
        const index = apiState.findIndex((x) => x.type === type);
        return {
          apiState: [
            ...apiState.slice(0, index),
            { ...apiState[index], state: 'ERROR', message: 'Load todo failed' },
            ...apiState.slice(index + 1),
          ],
        };
      });
    }
  };

  addTodo = async (e) => {
    e.preventDefault();
    const type = 'ADD_TODO';
    try {
      this.setState(({ apiState }) => ({
        apiState: [
          ...apiState,
          {
            type,
            state: 'LOADING',
            message: 'Todo Date is loading...',
          },
        ],
      }));
      const todoText = this.inputRef.current;
      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text: todoText.value,
          isDone: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      this.setState(
        ({ todoList, apiState }) => {
          const index = apiState.findIndex((x) => x.type === type);
          return {
            todoList: [json, ...todoList],
            apiState: [
              ...apiState.slice(0, index),
              {
                ...apiState[index],
                state: 'ERROR',
                message: 'Load todo failed',
              },
              ...apiState.slice(index + 1),
            ],
          };
        },
        () => {
          todoText.value = '';
        },
      );
    } catch (error) {
      this.setState(({ apiState }) => {
        const index = apiState.findIndex((x) => x.type === type);
        return {
          apiState: [
            ...apiState.slice(0, index),
            { ...apiState[index], state: 'ERROR', message: 'Load todo failed' },
            ...apiState.slice(index + 1),
          ],
        };
      });
    }
  };

  toggleComplete = async (item) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
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
        const index = todoList.findIndex((x) => x.id === item.id);

        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteTodo = async (item) => {
    try {
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
      });

      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === item.id);

        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { todoList, filterType, apiState } = this.state;

    const loadTodoState = apiState.find((x) => x.type === 'LOAD_TODO');

    const AddTodoState = apiState.find((x) => x.type === 'ADD_TODO');

    console.log('render');
    return (
      <div className="flex flex-col h-screen">
        <h1 className="text-center m-4">Todo App</h1>
        <form className="flex justify-center my-10" onSubmit={this.addTodo}>
          <div>
            <Label htmlFor="todoText" className="sr-only">
              Todo Text
            </Label>
            <Input
              ref={this.inputRef}
              id="todoText"
              placeholder="Enter your todo here..."
              className="rounded-r-none"
            />
          </div>
          <Button
            type="submit"
            className="rounded-l-none"
            disabled={AddTodoState?.state === 'LOADING'}
          >
            Add Todo
          </Button>
        </form>
        <div className="flex-1">
          {(() => {
            switch (loadTodoState?.state) {
              case 'LOADING':
                return (
                  <div className="text-center text-blue-500">
                    {loadTodoState?.message}
                  </div>
                );

              case 'ERROR':
                return (
                  <div className="text-center text-red-500">
                    {loadTodoState?.message}
                  </div>
                );

              default:
                return todoList.map((item) => (
                  <div className="flex items-center m-4">
                    <div>
                      <Label htmlFor="toggleComplete" className="sr-only">
                        Toggle Complete Todo
                      </Label>
                      <Checkbox
                        id="toggleComplete"
                        checked={item.isDone}
                        onCheckedChange={() => this.toggleComplete(item)}
                      />
                    </div>
                    <p className="!m-0 flex-1 px-4 line-clamp-1">{item.text}</p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Delete Todo</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => this.deleteTodo(item)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    {/* <Button type="button" onClick={() => this.deleteTodo(item)}>
                    Delete Todo
                  </Button> */}
                  </div>
                ));
            }
          })()}
        </div>
        <div className="flex">
          <Button
            variant={filterType === 'all' ? 'destructive' : 'default'}
            className="rounded-none flex-1"
            onClick={() => this.loadTodo('all')}
          >
            All
          </Button>
          <Button
            variant={filterType === 'pending' ? 'destructive' : 'default'}
            className="rounded-none flex-1"
            onClick={() => this.loadTodo('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filterType === 'completed' ? 'destructive' : 'default'}
            className="rounded-none flex-1"
            onClick={() => this.loadTodo('completed')}
          >
            Completed
          </Button>
        </div>
      </div>
    );
  }
}
