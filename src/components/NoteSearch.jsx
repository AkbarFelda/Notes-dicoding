import React from 'react';

class NoteSearch extends React.Component {
  render() {
    return (
      <div className="note-search" data-testid="note-search">
        <input
          type="text"
          placeholder="Cari catatan..."
          value={this.props.value}
          onChange={(event) => this.props.onSearch(event.target.value)}
          data-testid="note-search-input"
        />
      </div>
    );
  }
}

export default NoteSearch;