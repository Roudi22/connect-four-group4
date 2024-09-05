import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ErrorBoundary and component
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/ErrorBoundary.tsx';
// ErrorBoundary test
import ErrorThrowingComponent from './components/ErrorThrowing.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorComponent}
      onReset={() => location.reload()}
    >
      <ErrorThrowingComponent />
      <App />
    </ErrorBoundary>
  </StrictMode>
);
