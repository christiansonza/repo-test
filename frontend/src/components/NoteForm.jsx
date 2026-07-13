import { useState } from "react";

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    addNote(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter note..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

export default NoteForm;