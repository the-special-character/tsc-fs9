import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Child2 from './child2';
import Child1 from './child1';
import Child3 from './child3';

// Child2.getDerivedStateFromProps = (props, state) => ({
//   greet: `hello ${props.name}`,
// });

class App extends Component {
  state = {
    name: 'yagnesh',
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error, info) {
    console.log(info.componentStack);
  }

  render() {
    console.log('render app');
    const { name, error } = this.state;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        <p>app component name = {name}</p>

        <button
          type="button"
          onClick={() => {
            this.setState({ name: 'rohit' });
          }}
        >
          Change name
        </button>

        {name === 'yagnesh' && <Child1 name={name} />}
        <Child2 />
        <Child3 />
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
