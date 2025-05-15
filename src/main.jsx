import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    }
  }
});

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<div>エラーが発生しました。</div>}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  </StrictMode>,
)
