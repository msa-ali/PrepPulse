import { useState } from 'react';

export const Counter = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc' }}>
      <h3>Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </div>
  );
};
