// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './styles/GlobalStyles.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <GlobalStyles>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId="115197477718-mhttfrer23q53r9ie7rmfkm21n5s3ppq.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </GlobalStyles>,
  // </StrictMode>
);
