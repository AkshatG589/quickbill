import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head'; // ✅ import HeadProvider

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from "./Components/Footer";

const publishableKey = process.env.REACT_APP_PUBLIC_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <HeadProvider> {/* ✅ Wrap app with HeadProvider */}
          <App />
          {/* Footer */}
          <Footer />
        </HeadProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();