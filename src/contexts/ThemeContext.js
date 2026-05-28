import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  function toggleTheme() {
    setIsDarkMode((prev) => !prev);
  }

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode 
      ? {
          background: '#121212',
          surface: '#1E1E1E',
          text: '#FFFFFF',
          textSecondary: '#A0A0A0',
          border: '#2A2A2A',
          primary: '#2196F3',
          danger: '#F44336'
        } 
      : {
          background: '#F5F5F5',
          surface: '#FFFFFF',
          text: '#121212',
          textSecondary: '#666666',
          border: '#E0E0E0',
          primary: '#2196F3',
          danger: '#F44336'
        }
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}