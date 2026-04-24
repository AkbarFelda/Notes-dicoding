import React, { useContext, useEffect, useState } from 'react';
import { getActiveNotes, getArchivedNotes, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import NotesList from '../components/NotesList';
import LoadingIndicator from '../components/LoadingIndicator';
import AuthContext from '../contexts/AuthContext';
import ThemeContext from '../contexts/ThemeContext';
import LanguageContext from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loadingNotes, setLoadingNotes] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.accessToken) {
      fetchNotes();
    }
  }, [currentUser]);

  const handleSelectNote = (note) => {
    if (!note?.id) return;
    navigate(`/notes/${note.id}`, { state: { note } });
  };

  const fetchNotes = async () => {
    setLoadingNotes(true);
    try {
      const activeNotes = await getActiveNotes();
      const archivedNotes = await getArchivedNotes();
      setNotes([...activeNotes.data, ...archivedNotes.data]);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoadingNotes(false);
    }
  };


  const onDeleteHandler = (id) => {
    deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const onArchiveHandler = (id, archived) => {
    if (archived) unarchiveNote(id);
    else archiveNote(id);

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !archived } : note
      )
    );
  };

  const onSearchHandler = (keyword) => setSearchKeyword(keyword);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    note.body.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const activeNotes = sortedNotes.filter((note) => !note.archived);
  const archivedNotes = sortedNotes.filter((note) => note.archived);

  const text = {
    textHeader: { id: 'Catatan Pribadi', en: 'My Personal Notes' },
    activeNotes: { id: 'Catatan Aktif', en: 'Active Notes' },
    archivedNotes: { id: 'Catatan Arsip', en: 'Archived Notes' },
    loginMessage: { id: 'Silakan login untuk melihat catatan', en: 'Please log in to view your notes' },
  };

  if (!currentUser || !currentUser.accessToken) {
    return (
      <div className="home-page">
        <h1>{text.loginMessage[language]}</h1>
      </div>
    );
  }

  return (
    <div className={`note-app ${theme}`}>
      <HeaderComponent
        title={text.textHeader[language]}
        showSearch={true}
        searchValue={searchKeyword}
        onSearch={onSearchHandler}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <div className="note-app__body">
        <button
          className="add-note-button"
          onClick={() => navigate('/notes/new')}
        >
          {language === 'en' ? 'Add Note' : 'Tambah Catatan'}
        </button>

        {loadingNotes ? (
          <div className="loading-wrapper">
            <LoadingIndicator size={80} />
          </div>
        ) : (
          <>
            <section>
              <h2>{text.activeNotes[language]} ({activeNotes.length})</h2>
              <NotesList
                notes={activeNotes}
                onDelete={onDeleteHandler}
                onArchive={(id) => onArchiveHandler(id, false)}
                onSelect={handleSelectNote}
                searchKeyword={searchKeyword}
              />
            </section>

            <section>
              <h2>{text.archivedNotes[language]} ({archivedNotes.length})</h2>
              <NotesList
                notes={archivedNotes}
                onDelete={onDeleteHandler}
                onArchive={(id) => onArchiveHandler(id, true)}
                onSelect={handleSelectNote}
                searchKeyword={searchKeyword}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;