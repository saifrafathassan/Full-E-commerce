import React, { useState, useEffect } from 'react';
import './TypingEffect.css'; 

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(displayedText + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setTypingComplete(true); 
    }
  }, [displayedText, index, text, speed]);

  return (
    <div className={`typing-effect ${typingComplete ? 'complete' : ''}`}>
      {displayedText}
    </div>
  );
};

export default TypingEffect;
