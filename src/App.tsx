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
  const [selectedNote, setSelectedNote] =
  useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] =
  useState("newest");

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
  pinned: false,
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
const togglePin = (id: string) => {
  const updatedNotes = notes.map((note) =>
    note.id === id
      ? { ...note, pinned: !note.pinned }
      : note
  );

  setNotes(updatedNotes);
  saveNotes(updatedNotes);
};
const toggleNote = (id: string) => {
  setSelectedNote(
    selectedNote === id ? null : id
  );
};
  const filteredNotes = [...notes]
  .filter((note) => {
    const search = searchTag.toLowerCase();

    return (
      note.title.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(search)
      )
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );

      case "az":
        return a.title.localeCompare(b.title);

      case "za":
        return b.title.localeCompare(a.title);

      case "pinned":
        return Number(b.pinned) - Number(a.pinned);

      default:
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
    }
  });

  return (
    <div
  className={darkMode ? "dark-mode" : ""}
  style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  }}
>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <h1>📝 Notes Manager</h1>

    <p className="subtitle">
      Organize your ideas and tasks efficiently
    </p>
  </div>

  <button
    className="theme-btn"
    onClick={() =>
      setDarkMode(!darkMode)
    }
  >
    {darkMode ? "☀️" : "🌙"}
  </button>
</div>
      <NoteForm
  onAddNote={addNote}
  editingNote={editingNote}
/>

<SearchBar
  searchTag={searchTag}
  setSearchTag={setSearchTag}
/>

<div
  style={{
    marginTop: "15px",
    marginBottom: "15px",
    textAlign: "center",
  }}
>
  <label>Sort By: </label>

  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
  >
    <option value="newest">
      Newest First
    </option>

    <option value="oldest">
      Oldest First
    </option>

    <option value="az">
      A - Z
    </option>

    <option value="za">
      Z - A
    </option>

    <option value="pinned">
      Pinned First
    </option>
  </select>
</div>

<hr />

      <div style={{ textAlign: "center" }}>
  <h2>
    📚 My Notes ({filteredNotes.length})
  </h2>
</div>

      {filteredNotes.length === 0 ? (
        <div
  style={{
    textAlign: "center",
    padding: "30px",
    color: "#64748b",
  }}
>
  <h3>📝 No Notes Found</h3>
  <p>
    Create a note or try a different search.
  </p>
</div>
      ) : (
        filteredNotes.map((note) => (
  <div key={note.id} className="note-card">
    {note.pinned && (
      <div
        style={{
          color: "#7c3aed",
          fontWeight: "bold",
          marginBottom: "8px",
        }}
      >
        📌 Pinned
      </div>
    )}

    <h3
  style={{
    cursor: "pointer",
    color: "#4338ca",
    fontSize: "20px",
    fontWeight: 600,
  }}
  onClick={() => toggleNote(note.id)}
>
  <span
    style={{
      fontSize: "12px",
      marginRight: "6px",
    }}
  >
    {selectedNote === note.id ? "▼" : "▶"}
  </span>

  {note.title}
</h3>

    <small
  style={{
    color: "#6b7280",
    display: "block",
    marginTop: "4px",
  }}
>
  📅 {note.createdAt} • 📝 {note.content.length} characters
</small>

    {selectedNote === note.id && (
      <>
        <p className="note-content">
          {note.content}
        </p>

  
        <div className="tags-container">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="button-group">
          <button
            className="pin-btn"
            onClick={() =>
              togglePin(note.id)
            }
          >
            {note.pinned
              ? "📌 Unpin"
              : "📌 Pin"}
          </button>

          <button
            className="edit-btn"
            onClick={() =>
              setEditingNote(note)
            }
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn"
            onClick={() =>
              deleteNote(note.id)
            }
          >
            🗑 Delete
          </button>
        </div>
      </>
    )}
  </div>
))
      )}
    </div>
  );
}

export default App;