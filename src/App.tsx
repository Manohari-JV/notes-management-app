import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NoteForm from "./components/NoteForm";
import type { Note } from "./types/Note";
import { getNotes, saveNotes } from "./utils/localStorage";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTag, setSearchTag] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  
  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const addNote = (
  title: string,
  content: string,
  tags: string[]
) => {
  if (editingNote) {
    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id
        ? {
            ...note,
            title,
            content,
            tags,
          }
        : note
    );

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setEditingNote(null);

    return;
  }

  const newNote: Note = {
    id: uuidv4(),
    title,
    content,
    tags,
    createdAt: new Date().toLocaleString(),
  };

  const updatedNotes = [...notes, newNote];

  setNotes(updatedNotes);
  saveNotes(updatedNotes);
};

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(
      (note) => note.id !== id
    );

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) => {
  const search = searchTag.toLowerCase();

  return (
    note.title.toLowerCase().includes(search) ||
    note.content.toLowerCase().includes(search) ||
    note.tags.some((tag) =>
      tag.toLowerCase().includes(search)
    )
  );
});

  return (
    <div
  style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  }}
>
<h1>📝 Notes Manager</h1>
<p className="subtitle">
  Organize your ideas and tasks efficiently
</p>
      <NoteForm
  onAddNote={addNote}
  editingNote={editingNote}
/>

      <SearchBar
        searchTag={searchTag}
        setSearchTag={setSearchTag}
      />

      <hr />

      <div style={{ textAlign: "center" }}>
  <h2>📚 My Notes</h2>
</div>

      {filteredNotes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        filteredNotes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>

<small>
  Created: {note.createdAt || "NO DATE FOUND"}
</small>

<p className="note-content">
      {note.content}
    </p>

            <div className="tags-container">
      {note.tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>

            <br />
            <br />

            <div className="button-group">
    <button
      className="edit-btn"
      onClick={() => setEditingNote(note)}
    >
      ✏️ Edit
    </button>

    <button
      className="delete-btn"
      onClick={() => deleteNote(note.id)}
    >
      🗑 Delete
    </button>
  </div>
</div>
        ))
      )}
    </div>
  );
}

export default App;