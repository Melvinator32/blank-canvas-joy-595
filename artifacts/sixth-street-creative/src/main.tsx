import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SiteEditorProvider } from './SiteEditor';
import './index.css';
import './mediums.css';
import './photo.css';
import './artists.css';
import './mobile.css';
import './about-cleanup.css';
import './editor.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SiteEditorProvider><App /></SiteEditorProvider>
  </React.StrictMode>,
);
