/* eslint-disable */
//eslint-disable-next-line
import { useEffect, useState } from 'react';
//eslint-disable-next-line
import type { Theme } from '../types'; //eslint-disable-line

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  const getCurrentTheme = (): Theme => {
    if (
      (typeof localStorage.getItem('theme') === 'string' && localStorage.getItem('theme') === 'dark') ||
      (typeof window.localStorage.getItem('theme') !== 'string' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark';
    } else {
      return 'light';
    }
  };

  useEffect(() => {
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex-shrink-0 leading-tight text-sm md:text-base bg-gray-400 p-2 lg:py-1 lg:px-2 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      {theme === 'light' ? '☾' : '☼'}
    </button>
  );
};

export default ThemeToggleButton;
