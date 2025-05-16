import React from 'react';
import { useEffect } from 'react';
import { lightTheme } from './styles/light';
import { darkTheme } from './styles/dark';
import { applyTheme } from './styles/GlobalStyle'
import Navbar from './components/common/navbar';
import ThemeToggle from './components/common/themeToggle';

function App() {
  useEffect(() => {
    applyTheme(lightTheme); // أو darkTheme حسب الحاجة
  }, []);

  return (
    <div>
      <div className="bg-bg text-textMain min-h-screen p-8">
        <h1 className="text-3xl font-bold">مرحبا بك</h1>
        <h1 className="text-4xl font-bold">مثال على التبديل بين الثيمات</h1>
        <p className="text-textMuted">يمكنك التبديل بين الوضع الفاتح والغامق أدناه.</p>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default App;
