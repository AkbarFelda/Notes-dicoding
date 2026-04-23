import React, { useContext, useState } from 'react';
import useInput from '../hooks/useInput';
import LanguageContext from '../contexts/LanguageContext';

export default function NoteInput({ addNote }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const { language } = useContext(LanguageContext);
  const text = {
    titleNotes: { id: 'Judul Catatan', en: 'Note Title' },
    bodyNotes: { id: 'Isi Catatan', en: 'Note Body' },
    addNote: { id: 'Tambah Catatan', en: 'Add Note' },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return alert('Title dan body harus diisi!');
    setLoading(true);
    await addNote({ title, body });
    setLoading(false);
  };

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={text.titleNotes[language]}
        value={title}
        onChange={onTitleChange}
      />
      <textarea
        placeholder={text.bodyNotes[language]}
        value={body}
        onChange={onBodyChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Menambahkan...' : text.addNote[language]}
      </button>
    </form>
  );
}