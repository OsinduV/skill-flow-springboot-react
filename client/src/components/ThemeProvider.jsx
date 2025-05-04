import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); // or document.body
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200">
      {children}
    </div>
  );
}
