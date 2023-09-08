import React from 'react';
import { Note } from '../../types/Note';

export interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onEdit }) => {
  const handleEdit = () => {
    onEdit(note);
  }

  const handleDelete = () => {
    if (note?.id) {
      onDelete(note.id);
    }
  }

  return (
    <tr>
      <td>{note.title}</td>
      <td>{note.content}</td>
      <td><button className="outlined" onClick={handleEdit}>Edit</button></td>
      <td><button className="danger" onClick={handleDelete}>Delete</button></td>
    </tr>
  );
};

export default NoteItem;
