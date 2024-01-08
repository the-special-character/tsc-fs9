import React, { useCallback, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './style.css';
import { TodoProvider } from './context/todoContext';

const rootEle = document.getElementById('root');

const root = createRoot(rootEle);

// function Test() {
//   const [counter, setCounter] = useState(0);
//   const [greet, setGreet] = useState('hello');

//   const inc = useCallback(() => {
//     setCounter(val => val + 1);
//   }, []);

//   const dec = useCallback(() => {
//     setCounter(val => val - 1);
//   }, []);

//   const data = useMemo(
//     () => ({
//       greet: `${greet} world`,
//     }),
//     [greet],
//   );

//   return (
//     <div>
//       {counter}
//       <button type="button" onClick={() => setGreet('bonjour')}>
//         Change Greet Message
//       </button>
//       <Child inc={inc} dec={dec} data={data} />
//     </div>
//   );
// }

root.render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
