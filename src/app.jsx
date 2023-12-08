import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Child2 from './child2';

// Child2.getDerivedStateFromProps = (props, state) => ({
//   greet: `hello ${props.name}`,
// });

class App extends Component {
  state = {
    name: 'yagnesh',
  };

  render() {
    const { name } = this.state;
    return (
      <>
        <Child2 name={name} />
        <button
          type="button"
          onClick={() => {
            this.setState({ name: 'rohit' });
          }}
        >
          Change name
        </button>

        <p>app component name = {name}</p>
      </>
    );
  }
}

// function App({ title, desc, age, gender }) {
//   console.log('app render');
//   return (
//     <>
//       <h1 className="bg-yellow-400 text-blue-600">{`hello ${title}`}</h1>
//       <h2>{desc}</h2>
//       {age && <h3>{age}</h3>}
//       {gender && <h4>{gender}</h4>}
//       <input type="text" />
//       <input type="checkbox" />
//       <button type="button">Submit</button>
//       <Child1 />
//       <Child2 name="yagnesh" />
//       <Child3 />
//     </>
//   );
// }

App.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  age: PropTypes.number,
  gender: PropTypes.oneOf(['male', 'female']),
};

App.defaultProps = {
  age: undefined,
  gender: 'male',
};

export default App;
