import { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const API = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const addNote = async (title) => {
    await axios.post(API, { title });
    getNotes();
  };

  const updateNote = async (id, title) => {
    await axios.put(`${API}/${id}`, { title });
    getNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    getNotes();
  };

  return (
    <div className="container">
      <h1>Notes CRUD</h1>

      <NoteForm addNote={addNote} />

      <NoteList
        notes={notes}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}

export default App;