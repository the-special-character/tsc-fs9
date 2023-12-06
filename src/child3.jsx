import React, { Component } from 'react';

export default class Child3 extends Component {
  state = {
    user: {
      name: 'yagnesh',
      gender: 'male',
      age: 36,
    },
    displayAge: true,
  };

  render() {
    const { user, displayAge } = this.state;

    return (
      <div>
        <p>{user.name}</p>
        <p>{user.gender}</p>
        {displayAge && <p>{user.age}</p>}
        {!displayAge && (
          <button
            type="button"
            onClick={() => {
              this.setState({ displayAge: true });
            }}
          >
            Show Age
          </button>
        )}
        {displayAge && (
          <button
            type="button"
            onClick={() => {
              this.setState({ displayAge: false });
            }}
          >
            Hide Age
          </button>
        )}
      </div>
    );
  }
}
