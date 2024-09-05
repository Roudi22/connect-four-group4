import { useState } from 'react';

export default function ErrorThrowingComponent() {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    // Simulate an error by throwing an exception
    throw new Error('This is a test error!');
  }

  return (
    <>
      <h3>Error Throwing Component</h3>
      <p>Click the button below to throw an error.</p>
      <button onClick={() => setThrowError(true)}>Throw Error</button>
    </>
  );
}
