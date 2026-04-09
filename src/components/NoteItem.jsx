import React from 'react';
import { showFormattedDate } from '../utils';
import NoteActionButton from './NoteActionButton';

function highlightText(text = '', keyword = '') {
  if (!keyword || !keyword.trim()) {
    return text;
  }

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === keyword.toLowerCase()) {
      return <mark key={`${part}-${index}`}>{part}</mark>;
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

function NoteItem({ note, onDelete, onArchive, onSelect, searchKeyword }) {
  if (!note) {
    return null;
  }

  const handleSelect = () => {
    if (typeof onSelect === 'function') {
      onSelect(note);
    }
  };

  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note.id}
    >
      <div
        className="note-item__content note-item__content--clickable"
        data-testid="note-item-content"
        onClick={handleSelect}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && typeof onSelect === 'function') {
            onSelect(note);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>

        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>

        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>

      <div className="note-item__action" data-testid="note-item-action">
        <NoteActionButton
          variant="delete"
          onClick={() => onDelete(note.id)}
          dataTestId="note-item-delete-button"
        >
          Hapus
        </NoteActionButton>

        <NoteActionButton
          variant="archive"
          onClick={() => onArchive(note.id)}
          dataTestId="note-item-archive-button"
        >
          {note.archived ? 'Pindahkan' : 'Arsipkan'}
        </NoteActionButton>
      </div>
    </div>
  );
}

export default NoteItem;