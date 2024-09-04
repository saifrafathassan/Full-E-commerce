import React, { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';

export default function LoadingComponent({ children }) {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasVisited');
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 1800); 

      return () => clearTimeout(timer); 
    }
  }, [loading]);

  return loading ? (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <TypingEffect text="Swift Store.." speed={100} />
    </div>
  ) : (
    children
  );
}
