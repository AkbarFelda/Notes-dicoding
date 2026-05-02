import React, { useContext, useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import ThemeContext from '../contexts/ThemeContext';
import LanguageContext from '../contexts/LanguageContext';
import { getUserLogged } from '../utils/network-data';
import { putAccessToken } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = ({ title, showSearch = false, searchValue, onSearch }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage, flags } = useContext(LanguageContext);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserLogged();
      if (result.error) {
        setUser(null);
      } else {
        setUser(result.data);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    putAccessToken('');
    setUser(null);
    setIsLogoutPopupOpen(false);
    navigate('/login');
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openLogoutPopup = () => setIsLogoutPopupOpen(true);
  const closeLogoutPopup = () => setIsLogoutPopupOpen(false);

  return (
    <header className="app-header">
      <h1>{title}</h1>

      <div className="header-controls">
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
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {flags.map((f) => (
            <option key={f.code} value={f.code}>
              {f.emoji}
            </option>
          ))}
        </select>
        <div className="dark-mode-icon" onClick={toggleTheme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </div>
        {user ? (
          <div className="user-info">
            <div
              className="user-avatar"
              onClick={toggleDropdown}
            >
              <span>{user.name || user.email}</span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={openLogoutPopup}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          null
        )}
      </div>

      {isLogoutPopupOpen && (
        <div className="logout-popup">
          <div className="popup-content">
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Yes, Logout</button>
            <button onClick={closeLogoutPopup}>Cancel</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;