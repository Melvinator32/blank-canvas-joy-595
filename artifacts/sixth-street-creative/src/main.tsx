import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './artists.css';
import './mobile.css';

function SiteRoot() {
  useEffect(() => {
    const applyCopyAndCleanups = () => {
      const heroTitle = document.querySelector('.hero h1');
      if (heroTitle && heroTitle.textContent?.trim() !== 'Creating spaces that feel like an extension of you.') {
        heroTitle.innerHTML = 'Creating spaces that feel<br /><em>like an extension of you.</em>';
      }

      document.querySelectorAll('.section-number, .journey-number').forEach((element) => element.remove());

      document.querySelectorAll('.category-card > span:first-child').forEach((element) => element.remove());
      document.querySelectorAll('.portfolio-row-meta > span:first-child').forEach((element) => element.remove());
      document.querySelectorAll('.medium-meta > span:first-child').forEach((element) => element.remove());
    };

    applyCopyAndCleanups();

    const observer = new MutationObserver(applyCopyAndCleanups);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('hashchange', applyCopyAndCleanups);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', applyCopyAndCleanups);
    };
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SiteRoot />
  </React.StrictMode>,
);
