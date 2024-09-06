import { FallbackProps } from "react-error-boundary";

// Displays an error message when something goes wrong in the app
export default function ErrorComponent({ error, resetErrorBoundary }: FallbackProps) {
  // Logs the error to the console
  console.log(error);

  // UI for the error screen
  return (
    <>
      {/* Error message */}
      <h3>Something went wrong!</h3>
      {/* Displays the error details */}
      <pre>{error + ''}</pre>
      {/* Button to reset and restart the app */}
      <button onClick={resetErrorBoundary}>Restart the application</button>
    </>
  );
}
