import { useState } from "react";

function NoteList({ notes, updateNote, deleteNote }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
  };

  const saveEdit = () => {
    updateNote(editingId, editTitle);
    setEditingId(null);
  };

  return (
    <div>
      {notes.map((note) => (
        <div key={note._id} className="note">
          {editingId === note._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <button onClick={saveEdit}>Save</button>
            </>
          ) : (
            <>
              <span>{note.title}</span>

              <button onClick={() => startEdit(note)}>
                Edit
              </button>

              <button onClick={() => deleteNote(note._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default NoteList;