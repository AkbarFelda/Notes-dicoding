import React from 'react';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';
import NoteSearch from './NoteSearch';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchKeyword: '',
      selectedNote: null,
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onSelectNoteHandler = this.onSelectNoteHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => ({
      notes: [
        {
          id: +new Date(),
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
        },
        ...prevState.notes,
      ],
    }));
  }

  onDeleteHandler(id) {
    this.setState((prevState) => {
      const updatedNotes = prevState.notes.filter((note) => note.id !== id);

      return {
        notes: updatedNotes,
        selectedNote:
          prevState.selectedNote && prevState.selectedNote.id === id
            ? null
            : prevState.selectedNote,
      };
    });
  }

  onArchiveHandler(id) {
    this.setState((prevState) => {
      const updatedNotes = prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      );

      const updatedSelectedNote = prevState.selectedNote
        ? updatedNotes.find((note) => note.id === prevState.selectedNote.id) ||
          null
        : null;

      return {
        notes: updatedNotes,
        selectedNote: updatedSelectedNote,
      };
    });
  }

  onSearchHandler(keyword) {
    this.setState({
      searchKeyword: keyword,
    });
  }

  onSelectNoteHandler(note) {
    this.setState({
      selectedNote: note,
    });
  }

  onCloseDetailHandler() {
    this.setState({
      selectedNote: null,
    });
  }

  render() {
    const { notes, searchKeyword, selectedNote } = this.state;

    const filteredNotes = notes.filter((note) => {
      const keyword = searchKeyword.toLowerCase();

      return (
        note.title.toLowerCase().includes(keyword) ||
        note.body.toLowerCase().includes(keyword)
      );
    });

    const sortedNotes = [...filteredNotes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const activeNotes = sortedNotes.filter((note) => !note.archived);
    const archivedNotes = sortedNotes.filter((note) => note.archived);

    if (selectedNote) {
      return (
        <div className="note-app" data-testid="note-app">
          <div className="note-app__header" data-testid="note-app-header">
            <h1>Detail Catatan</h1>
          </div>

          <div className="note-app__body" data-testid="note-app-body">
            <NoteDetail
              note={selectedNote}
              onBack={this.onCloseDetailHandler}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>
          <NoteSearch
            value={searchKeyword}
            onSearch={this.onSearchHandler}
          />
        </div>

        <div className="note-app__body" data-testid="note-app-body">
          <NoteInput addNote={this.onAddNoteHandler} />

          <section
            aria-labelledby="active-notes-title"
            data-testid="active-notes-section"
          >
            <h2 id="active-notes-title">
              Catatan Aktif ({activeNotes.length})
            </h2>
            <NotesList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              onSelect={this.onSelectNoteHandler}
              searchKeyword={searchKeyword}
              dataTestId="active-notes-list"
            />
          </section>

          <section
            aria-labelledby="archived-notes-title"
            data-testid="archived-notes-section"
          >
            <h2 id="archived-notes-title">
              Arsip ({archivedNotes.length})
            </h2>
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              onSelect={this.onSelectNoteHandler}
              searchKeyword={searchKeyword}
              dataTestId="archived-notes-list"
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;