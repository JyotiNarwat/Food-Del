import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider, { StoreContext } from './context/Storecontext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
   <StoreContextProvider>
    <App/>
    </StoreContextProvider>
   </BrowserRouter>
);
