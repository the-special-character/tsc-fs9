import React, { useEffect, useState, memo } from 'react';

function Child({ inc, dec, data }) {
  console.log('Child');
  return (
    <div>
      <p id="text">{data.greet}</p>
      <button type="button" onClick={inc}>
        +
      </button>
      <button type="button" onClick={dec}>
        -
      </button>
    </div>
  );
}

export default memo(Child);
