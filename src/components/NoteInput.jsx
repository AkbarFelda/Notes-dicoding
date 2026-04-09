import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      errorMessage: '',
    };

    this.onTitleChangeEventHandler =
      this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const { value } = event.target;

    if (value.length <= 50) {
      this.setState({
        title: value,
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({
      body: event.target.value,
      errorMessage: '',
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (trimmedBody.length < 10) {
      this.setState({
        errorMessage: 'Isi catatan minimal harus 10 karakter',
      });
      return;
    }

    this.props.addNote({
      title: trimmedTitle,
      body: trimmedBody,
    });

    this.setState({
      title: '',
      body: '',
      errorMessage: '',
    });
  }

  render() {
    const { title, body, errorMessage } = this.state;
    const remainingChars = 50 - title.length;
    const isWarning = remainingChars < 10;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {errorMessage && (
          <p className="note-input__feedback--error">{errorMessage}</p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <p
            className={`note-input__title__char-limit ${
              isWarning ? 'note-input__title__char-limit--warning' : ''
            }`}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>

          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />

          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />

          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;