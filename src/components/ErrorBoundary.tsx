import { FallbackProps } from "react-error-boundary";

export default function ErrorComponent({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error);
  return (
    <>
      <h3>Something went wrong!</h3>
      <pre>{error + ''}</pre>
      <button onClick={resetErrorBoundary}>Restart the application</button>
    </>
  );
}
