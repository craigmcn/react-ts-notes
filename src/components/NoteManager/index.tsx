import React, { useState } from 'react';
import { Note } from '../../types/Note';
import NoteForm from '../NoteForm';
import NoteTable from '../NoteTable';

const nextNoteId = (notes: Note[]) => {
  const maxId = notes.reduce((max, note) => Math.max(max, note.id || 0), 0);
  return maxId + 1;
}

const NoteManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note>();

  const handleSubmit = (note: Note) => {
    setNoteToEdit(undefined);

    if (note.id === 0) {
      note.id = nextNoteId(notes);
      setNotes([...notes, note]);
      return
    }
    
    const updatedNotes = notes.map((n) => {
      if (n.id === note.id) {
        return note;
      }
      return n;
    });
    setNotes(updatedNotes);
  };

  const handleEdit = (note: Note) => {
    setNoteToEdit(note);
  }

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <div className="layout-column align-items-center justify-content-start" data-testid="note-manager">
      <NoteForm onSubmit={handleSubmit} noteToEdit={noteToEdit} />
      <NoteTable notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default NoteManager;
