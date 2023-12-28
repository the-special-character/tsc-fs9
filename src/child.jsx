import React, { useEffect, useState, memo } from 'react';

function Child({ counter, name }) {
  const [num, setNum] = useState(counter + 10);

  //   componentDidMount
  useEffect(() => {
    console.log(document.getElementById('text'));

    const mouseMove = () => {
      console.log('mouse move');
    };

    document.addEventListener('mousemove', mouseMove);

    // componentWillUnmount
    return () => {
      document.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  //   componentDiUpdate
  useEffect(() => {
    setNum(counter + 10);
  }, [counter, name]);

  return (
    <div>
      <p id="text">Child</p>
      <p>{num}</p>
    </div>
  );
}

export default memo(Child);
