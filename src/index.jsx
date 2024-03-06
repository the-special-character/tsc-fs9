/* eslint-disable max-classes-per-file */
/* eslint-disable react/state-in-constructor */
import './style.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="app"></div>';

// export default class App extends Component {
//   inputRef = createRef();

//   state = {
//     todoList: [],
//     page: 1,
//   };

//   addTodo = (e) => {
//     e.preventDefault();
//     const input = this.inputRef.current;
//     this.setState(
//       ({ todoList: a }) => ({
//         todoList: [
//           { id: new Date().valueOf(), text: input.value, isDone: false },
//           ...a,
//         ],
//       }),
//       () => {
//         input.value = '';
//       },
//     );
//   };

//   toggleComplete = (x) => {
//     this.setState(({ todoList }) => {
//       const index = todoList.findIndex((y) => y.id === x.id);
//       return {
//         todoList: [
//           ...todoList.slice(0, index),
//           { ...todoList[index], isDone: !x.isDone },
//           ...todoList.slice(index + 1),
//         ],
//       };
//     });
//   };

//   deleteTodo = (x) => {
//     this.setState(({ todoList }) => {
//       const index = todoList.findIndex((y) => y.id === x.id);
//       return {
//         todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
//       };
//     });
//   };

//   setNextPage = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   setPrevPage = () => {
//     this.setState(({ page }) => ({
//       page: page - 1,
//     }));
//   };

//   render() {
//     const { todoList, page } = this.state;

//     return (
//       <div className="flex flex-col">
//         <h1 className="text-4xl font-semibold text-center my-6">Todo App</h1>

//         <form onSubmit={this.addTodo} className="flex m-10">
//           <input
//             type="text"
//             name="todo"
//             id="todo"
//             required
//             ref={this.inputRef}
//             className="px-2 w-full block rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//           <Button type="submit" className="rounded-l-none min-w-28">
//             Add Todo
//           </Button>
//         </form>

//         {todoList.slice((page - 1) * 5, (page - 1) * 5 + 5).map((x) => (
//           <div key={x.id} className="mx-10 my-4 flex items-center">
//             <input
//               type="checkbox"
//               name="isDone"
//               id="isDone"
//               checked={x.isDone}
//               onChange={() => this.toggleComplete(x)}
//             />
//             <p className={`flex-1 px-6 ${x.isDone ? 'line-through' : ''}`}>
//               {x.text}
//             </p>
//             <Button type="button" onClick={() => this.deleteTodo(x)}>
//               Delete
//             </Button>
//           </div>
//         ))}

//         <div className="flex gap-4 mx-10 justify-end">
//           <Button
//             type="button"
//             disabled={Math.ceil(todoList.length / visibleItem) <= page}
//             onClick={this.setNextPage}
//           >
//             Next
//           </Button>
//           <Button type="button" disabled={page <= 1} onClick={this.setPrevPage}>
//             Previous
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }

// constructor
// getDerivedStateFromProps
// render

class Child extends Component {
  render() {
    const { givenName } = this.state;
    return (
      <div>
        <h1>Hello From Child Component</h1>
        <h2>{givenName}</h2>
      </div>
    );
  }
}

Child.getDerivedStateFromProps = (nextProps) => ({
  givenName: nextProps.name,
});

class LifeCycle extends Component {
  // assign props to state
  constructor(props) {
    super(props);

    this.state = {
      name: 'yagnesh',
      displayTitle: props.title,
    };
    console.log('constructor');
    // analytics

    console.log(document.getElementById('title'));
  }

  static getDerivedStateFromProps() {
    console.log('getDerivedStateFromProps');
    console.log(document.getElementById('title'));
    return null;
  }

  async componentDidMount() {
    document.getElementById('title').style.color = 'red';
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const json = await res.json();
      this.setState({ json });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(document.getElementById('title'));
    console.log('render');
    const { name, displayTitle, json } = this.state;
    return (
      <div>
        <h1 id="title">{displayTitle}</h1>
        {json && <h2>{json.title}</h2>}
        <button
          type="button"
          onClick={() => this.setState({ displayTitle: 'Hola Wolrd' })}
        >
          Change Title
        </button>
        <h2>{name}</h2>
        <button type="button" onClick={() => this.setState({ name: 'rohit' })}>
          Change Name
        </button>
        <Child name={name} />
      </div>
    );
  }
}

LifeCycle.propTypes = {
  title: PropTypes.string.isRequired,
};

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <div>
    <LifeCycle title="hello world" />
  </div>,
);
