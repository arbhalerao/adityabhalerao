import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { BiSun, BiMoon } from 'react-icons/bi';

const SHOW_THEME_TOGGLE = false;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  if (!SHOW_THEME_TOGGLE) return null;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center text-xl p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <BiSun className="text-brand hover:text-brand" />
      ) : (
        <BiMoon className="text-gray-600 hover:text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
