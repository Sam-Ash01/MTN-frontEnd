import React, { useState, useEffect } from 'react';
import { lightTheme } from '../../styles/light'
import { darkTheme } from '../../styles/dark';
import { applyTheme } from '../../styles/GlobalStyle';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      applyTheme(darkTheme);
      setIsDark(true);
    } else {
      applyTheme(lightTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    applyTheme(newTheme ? darkTheme : lightTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryHover"
    >
      {isDark ? 'الوضع الفاتح' : 'الوضع الغامق'}
    </button>
  );
};

export default ThemeToggle;
