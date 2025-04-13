import React from "react";
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'; // This is the correct way in Vite/React
import App from './App.jsx'
import { AppContextProvider } from "./context/AppContext.jsx";
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key(clerk)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <BrowserRouter> 
      <AppContextProvider>
        <App />
      </AppContextProvider> 
    </BrowserRouter>
  </ClerkProvider>,
)
