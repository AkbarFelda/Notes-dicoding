import React, { createContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'id');

  const toggleLanguage = () => {
    const newLang = language === 'id' ? 'en' : 'id';
    setLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  const flags = [
    { code: 'id', name: 'Bahasa Indonesia', emoji: '🇮🇩' },
    { code: 'en', name: 'English', emoji: '🇺🇸' },
  ];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, flags, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;