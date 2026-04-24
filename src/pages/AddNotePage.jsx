import React, { useState, useContext } from 'react';
import NoteInput from '../components/NoteInput';
import LoadingIndicator from '../components/LoadingIndicator';
import { addNote } from '../utils/network-data';
import LanguageContext from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import ThemeContext from '../contexts/ThemeContext';

const AddNotePage = () => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleAddNote = async ({ title, body }) => {
    setLoading(true);
    const note = await addNote({ title, body });
    setLoading(false);

    if (!note.error) {
      navigate('/home');
    }
  };


  return (
    <div className="add-note-page">
      <HeaderComponent
        title={language === 'en' ? 'Add New Note' : 'Tambah Catatan Baru'}
        showSearch={false}
        searchValue={false}
        onSearch={false}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      {loading && (
        <div className="loading-wrapper">
          <LoadingIndicator size={80} />
        </div>
      )}

      <NoteInput addNote={handleAddNote} />
    </div>
  );
};

export default AddNotePage;