import { useState } from 'react';

export default function ErrorThrowing() {
  // State to track if an error should be thrown
  const [throwError, setThrowError] = useState(false);

  // Throw an error when throwError is true
  if (throwError) {
    throw new Error('This is a test error!');
  }

  return (
    <>
      <h3>Error Throwing Component</h3>
      <p>Click the button below to throw an error.</p>
      {/* Button to trigger the error */}
      <button onClick={() => setThrowError(true)}>Throw Error</button>
    </>
  );
}
