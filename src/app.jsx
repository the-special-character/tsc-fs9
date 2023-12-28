import React, { useState, useRef, useEffect } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [errorList, setErrorList] = useState([]);

  const inputRef = useRef();

  const loadTodo = async ft => {
    const task = 'LOAD_TODO';
    try {
      setErrorList(val => [
        ...val,
        {
          task,
          stattus: 'LOADING',
        },
      ]);

      let url = 'http://localhost:3004/todo-list';
      if (filterType !== 'all') {
        url += `?isDone=${filterType === 'completed'}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setTodoList(json);
      // throw new Error('something went wrong...');
      setFilterType(ft);
      setErrorList(val => val.filter(x => x.task !== task));
    } catch (error) {
      setErrorList(val =>
        val.map(x => {
          if (x.task === task) {
            return { ...x, stattus: 'ERROR', message: error.message };
          }
          return x;
        }),
      );
    }
  };

  const addTodo = async event => {
    const task = 'ADD_TODO';
    try {
      event.preventDefault();
      setErrorList(val => [
        ...val,
        {
          task,
          stattus: 'LOADING',
        },
      ]);
      const todoText = inputRef.current;
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

      setTodoList(val => [...val, json]);

      todoText.value = '';
      setErrorList(val => val.filter(x => x.task !== task));
    } catch (error) {
      setErrorList(val =>
        val.map(x => {
          if (x.task === task) {
            return { ...x, stattus: 'ERROR', message: error.message };
          }
          return x;
        }),
      );
    }
  };

  const toggleComplete = async item => {
    const task = 'UPDATE_TODO';
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

      setTodoList(val => {
        const index = val.findIndex(x => x.id === item.id);
        return [...val.slice(0, index), json, ...val.slice(index + 1)];
      });

      setErrorList(val => val.filter(x => !(x.task === task && x.id === item.id)));
      // this.setState(({ todoList }) => {
      //   const index = todoList.findIndex(x => x.id === item.id);
      //   return {
      //     todoList: [...todoList.slice(0, index), json, ...todoList.slice(index + 1)],
      //   };
      // });
    } catch (error) {
      setErrorList(val =>
        val.map(x => {
          if (x.task === task && x.id === item.id) {
            return { ...x, stattus: 'ERROR', message: error.message };
          }
          return x;
        }),
      );
    }
  };

  const deleteTodo = async item => {
    const task = 'DELETE_TODO';
    try {
      setErrorList(val => [
        ...val,
        {
          task,
          stattus: 'LOADING',
          id: item.id,
        },
      ]);
      // throw new Error('something went wrong...');
      await fetch(`http://localhost:3004/todo-list/${item.id}`, {
        method: 'DELETE',
      });
      setTodoList(val => {
        const index = val.findIndex(x => x.id === item.id);
        return [...val.slice(0, index), ...val.slice(index + 1)];
      });
      setErrorList(val => val.filter(x => !(x.task === task && x.id === item.id)));
    } catch (error) {
      setErrorList(val =>
        val.map(x => {
          if (x.task === task && x.id === item.id) {
            return { ...x, stattus: 'ERROR', message: error.message };
          }
          return x;
        }),
      );
    }
  };

  useEffect(() => {
    loadTodo();
  }, []);

  const loadTodoStatus = errorList.find(x => x.task === 'LOAD_TODO');

  if (loadTodoStatus?.stattus === 'LOADING') {
    return <p>Loading....</p>;
  }

  if (loadTodoStatus?.stattus === 'ERROR') {
    return <p>{loadTodoStatus.message}</p>;
  }

  return (
    <main className="flex flex-col gap-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-4">Todo App</h1>
      <TodoForm
        addTodo={addTodo}
        ref={inputRef}
        state={errorList.find(x => x.task === 'ADD_TODO')}
      />

      <TodoList
        todoList={todoList}
        filterType={filterType}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        state={errorList.filter(x => x.task === 'DELETE_TODO' || x.task === 'UPDATE_TODO')}
      />

      <TodoFilter filterTodo={loadTodo} />
    </main>
  );
}

export default App;
