import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import LoadingIndicator from '../components/LoadingIndicator';

function NoteDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300); // 300ms
    return () => clearTimeout(timer);
  }, []);

  if (!note?.id && !loading) {
    return <p>Catatan tidak ditemukan!</p>;
  }

  return (
    <div className="note-detail">
      <HeaderComponent title="Detail Catatan" showSearch={false} />

      {loading ? (
        <div className="loading-wrapper">
          <LoadingIndicator size={80} />
        </div>
      ) : (
        <div className="note-detail__card">
          <h2 className="note-detail__title">{note.title}</h2>
          <p className="note-detail__date">
            Dibuat: {new Date(note.createdAt).toLocaleString()}
          </p>
          <p className="note-detail__body">{note.body}</p>
          <button
            className="note-detail__back-button"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteDetail;