import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import ThemeContext from '../contexts/ThemeContext';
import LanguageContext from '../contexts/LanguageContext';

const HeaderComponent = ({ title, showSearch = false, searchValue, onSearch }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage, flags } = useContext(LanguageContext);

  return (
    <header className="app-header">
      <h1>{title}</h1>

      <div className="header-controls">
        {/* Search bar hanya muncul kalau showSearch true */}
        {showSearch && (
          <div className="note-search">
            <input
              type="text"
              placeholder={language === 'id' ? 'Cari catatan...' : 'Search notes...'}
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}

        {/* Language dropdown */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {flags.map((f) => (
            <option key={f.code} value={f.code}>
              {f.emoji}
            </option>
          ))}
        </select>

        {/* Dark/Light toggle */}
        <div className="dark-mode-icon" onClick={toggleTheme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;