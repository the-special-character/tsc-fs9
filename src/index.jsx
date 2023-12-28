import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './style.css';
// import Child from './child';

const rootEle = document.getElementById('root');

const root = createRoot(rootEle);

// function App() {
//   const [counter, setCounter] = useState(0);

//   const inc = () => {
//     setCounter(val => val + 1);
//   };

//   const dec = () => {
//     setCounter(val => val - 1);
//   };

//   return (
//     <div>
//       <button type="button" onClick={inc}>
//         +
//       </button>
//       {counter}
//       <button type="button" onClick={dec}>
//         -
//       </button>
//       {counter < 5 && <Child counter={counter} name="yagnesh" />}
//     </div>
//   );
// }

root.render(<App title="hello" desc="" gender="male" />);
