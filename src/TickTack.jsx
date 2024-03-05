import React, { Component } from 'react';

const initBoxes = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

export default class TickTack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: initBoxes,
      tern: undefined,
      winner: null,
    };
  }

  onSelectBox = (e) => {
    const outerIndex = Number(e.target.getAttribute('data-outerIndex'));
    const innerIndex = Number(e.target.getAttribute('data-innerIndex'));

    this.setState(({ boxes, tern }) => {
      let winner;

      const updatedBoxes = [
        ...boxes.slice(0, outerIndex),
        [
          ...boxes[outerIndex].slice(0, innerIndex),
          tern,
          ...boxes[outerIndex].slice(innerIndex + 1),
        ],
        ...boxes.slice(outerIndex + 1),
      ];

      for (let i = 0; i < 3; i += 1) {
        winner =
          (updatedBoxes[i][0] === tern &&
            updatedBoxes[i][1] === tern &&
            updatedBoxes[i][2] === tern) ||
          (updatedBoxes[0][i] === tern &&
            updatedBoxes[1][i] === tern &&
            updatedBoxes[2][i] === tern);

        if (winner) {
          break;
        }
      }

      if (!winner) {
        winner =
          (updatedBoxes[0][0] === tern &&
            updatedBoxes[1][1] === tern &&
            updatedBoxes[2][2] === tern) ||
          (updatedBoxes[0][2] === tern &&
            updatedBoxes[1][1] === tern &&
            updatedBoxes[2][0] === tern);
      }

      if (winner) {
        winner = tern;
      }

      return {
        boxes: winner ? initBoxes : updatedBoxes,
        tern: tern === 'O' ? 'X' : 'O',
        winner,
      };
    });
  };

  render() {
    const { boxes, winner } = this.state;
    return (
      <>
        {winner && <h1>{`winner is ${winner}`}</h1>}
        <div className=" w-80 aspect-square grid grid-cols-3 grid-rows-3 gap-4">
          {boxes.map((outerItem, outerIndex) =>
            outerItem.map((innerItem, innerIndex) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={`${outerIndex}_${innerIndex}`}
                type="button"
                className="bg-yellow-200"
                data-outerIndex={outerIndex}
                data-innerIndex={innerIndex}
                onClick={this.onSelectBox}
              >
                {innerItem}
              </button>
            )),
          )}
        </div>
      </>
    );
  }
}
