import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ErrorBoundary and component
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/ErrorBoundary.tsx';
// A test component that throws an error to test the ErrorBoundary
// // import ErrorThrowing from './components/ErrorThrowing.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wraps the game inside ErrorBoundary */}
    <ErrorBoundary
      FallbackComponent={ErrorComponent}
      onReset={() => location.reload()}
    >
      {/* Boundary error testing component */}
      {/* <ErrorThrowing /> */}
      <App />
    </ErrorBoundary>
  </StrictMode>
);
