import React from 'react';
import NoteItem from './NoteItem';

function getGroupKey(date) {
  const parsedDate = new Date(date);
  const month = parsedDate.toLocaleString('id-ID', { month: 'long' });
  const year = parsedDate.getFullYear();

  return `${month}-${year}`;
}

function formatGroupTitle(groupKey) {
  const [month, year] = groupKey.split('-');
  return `${month} ${year}`;
}

function groupNotesByMonthYear(notes) {
  return notes.reduce((groups, note) => {
    const groupKey = getGroupKey(note.createdAt);

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(note);
    return groups;
  }, {});
}

function NotesList({
  notes,
  onDelete,
  onArchive,
  onSelect,
  searchKeyword,
  dataTestId = 'notes-list',
}) {
  const safeNotes = Array.isArray(notes) ? notes : [];
  const validNotes = safeNotes.filter(Boolean);
  const hasNotes = validNotes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const groupedNotes = groupNotesByMonthYear(validNotes);
  const groupedEntries = Object.entries(groupedNotes);

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {groupedEntries.map(([groupKey, groupedItems]) => (
        <section
          key={groupKey}
          className="notes-group"
          data-testid={`${groupKey}-group`}
        >
          <div className="notes-group__header">
            <h3>{formatGroupTitle(groupKey)}</h3>
            <span data-testid={`${groupKey}-group-count`}>
              {groupedItems.length} catatan
            </span>
          </div>

          <div className="notes-list__items">
            {groupedItems.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                onSelect={onSelect}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;