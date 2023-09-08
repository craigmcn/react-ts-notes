import React, { useEffect, useState } from 'react';
import "./index.css";
import { Note } from '../../types/Note';

export interface NoteFormProps {
  onSubmit: (note: Note) => void;
  noteToEdit?: Note;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, noteToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      return;
    }

    onSubmit({ id: noteToEdit?.id || 0, title, content });

    setTitle('');
    setContent('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  useEffect(() => {
    setTitle(noteToEdit?.title || '');
    setContent(noteToEdit?.content || '');
  }, [noteToEdit]);

  return (
    <div className="layout-column align-items-center justify-content-start" data-testid="note-manager">
      <div className="card w-200 pt-30 pb-8 mt-15 mb-15">
        <form onSubmit={handleSubmit} data-testid="note-form">
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <label className="form-title-label">Title:</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              data-testid="form-input"
              className="form-input"
              onChange={handleTitleChange}
            />
          </section>
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <label className="form-content-label">Content:</label>
            <textarea
              placeholder="Content"
              value={content}
              data-testid="form-textarea"
              className="form-textarea"
              onChange={handleContentChange}
            />
          </section>
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <button data-testid="form-submit-button" type="submit" disabled={!title || !content}>{noteToEdit ? 'Update' : 'Add'}</button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
