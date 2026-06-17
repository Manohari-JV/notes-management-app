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
    <div style={{ padding: "20px" }}>
      <h1>Notes Management Application</h1>

      <NoteForm
  onAddNote={addNote}
  editingNote={editingNote}
/>

      <SearchBar
        searchTag={searchTag}
        setSearchTag={setSearchTag}
      />

      <hr />

      <h2>Notes</h2>

      {filteredNotes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        filteredNotes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>

<small>
  Created: {note.createdAt || "NO DATE FOUND"}
</small>

<p>{note.content}</p>

            <div>
  {note.tags.map((tag) => (
    <span
      key={tag}
      style={{
        backgroundColor: "#e5e7eb",
        padding: "4px 8px",
        borderRadius: "12px",
        marginRight: "6px",
        fontSize: "12px",
      }}
    >
      {tag}
    </span>
  ))}
</div>

            <br />
            <br />

            <button
  onClick={() => setEditingNote(note)}
>
  Edit
</button>

{" "}

<button
  onClick={() => deleteNote(note.id)}
>
  Delete
</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;