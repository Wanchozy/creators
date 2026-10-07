/**
 * ==============================================================================
 * STEP 2: THE SPARK PLUG (src/main.tsx)
 * ==============================================================================
 * This is the very first TypeScript file that runs when the website starts up.
 * 
 * What it does in 3 lines:
 * 1. Finds the HTML element with id="root" inside index.html.
 * 2. Creates a "React Root" inside that element.
 * 3. Renders our master <App /> component inside it.
 * ==============================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Loads global Tailwind styles & glassmorphic themes

// Grab the empty <div id="root"> from index.html and tell React to take control
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> is our main traffic controller that decides which page to display */}
    <App />
  </React.StrictMode>
);
