import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import LoadingIndicator from '../components/LoadingIndicator';
import { getNote } from '../utils/network-data'; // Impor fungsi getNote

function NoteDetail() {
  const { id } = useParams(); // Ambil id dari URL params
  const navigate = useNavigate();

  const [note, setNote] = useState(null); // Simpan detail catatan
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true); // Tampilkan loading
      const result = await getNote(id); // Panggil API dengan id dari URL
      if (result.error) {
        // Tangani jika terjadi error (misal catatan tidak ditemukan)
        setNote(null);
      } else {
        setNote(result.data); // Update state dengan data catatan yang berhasil diambil
      }
      setLoading(false); // Sembunyikan loading
    };

    fetchNote(); // Panggil fungsi untuk mengambil catatan
  }, [id]); // Dependensi adalah id, agar data diperbarui ketika id berubah

  // Menampilkan loading indicator jika masih dalam proses pemuatan
  if (loading) {
    return (
      <div className="loading-wrapper">
        <LoadingIndicator size={80} />
      </div>
    );
  }

  // Menampilkan pesan jika catatan tidak ditemukan
  if (!note) {
    return <p>Catatan tidak ditemukan!</p>;
  }

  // Menampilkan detail catatan setelah berhasil diambil dari API
  return (
    <div className="note-detail">
      <HeaderComponent title="Detail Catatan" showSearch={false} />

      <div className="note-detail__card">
        <h2 className="note-detail__title">{note.title}</h2>
        <p className="note-detail__date">
          Dibuat: {new Date(note.createdAt).toLocaleString()}
        </p>
        <p className="note-detail__body">{note.body}</p>
        <button
          className="note-detail__back-button"
          onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;