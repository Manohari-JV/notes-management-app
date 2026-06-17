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
  const [categoryFilter, setCategoryFilter] =
  useState("All");
  const [trash, setTrash] = useState<Note[]>([]);
  const [showTrash, setShowTrash] =
  useState(false);
  const [showNotes, setShowNotes] =
  useState(false);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const addNote = (
  title: string,
  content: string,
  tags: string[],
  category: string
) => {
  if (editingNote) {
    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id
        ? {
            ...note,
            title,
            content,
            tags,
            category,
            updatedAt: new Date().toLocaleString(),
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
  category,
  createdAt: new Date().toLocaleString(),
  pinned: false,
};

  const updatedNotes = [...notes, newNote];

  setNotes(updatedNotes);
  saveNotes(updatedNotes);
};

  const deleteNote = (id: string) => {
  const noteToDelete = notes.find(
    (note) => note.id === id
  );

  if (noteToDelete) {
    setTrash([...trash, noteToDelete]);
  }

  const updatedNotes = notes.filter(
    (note) => note.id !== id
  );

  setNotes(updatedNotes);
  saveNotes(updatedNotes);
};



const restoreNote = (id: string) => {
  const noteToRestore = trash.find(
    (note) => note.id === id
  );

  if (!noteToRestore) return;

  const updatedNotes = [
    ...notes,
    noteToRestore,
  ];

  const updatedTrash = trash.filter(
    (note) => note.id !== id
  );

  setNotes(updatedNotes);
  setTrash(updatedTrash);

  saveNotes(updatedNotes);
};

  const exportNotes = () => {
  const dataStr = JSON.stringify(
    notes,
    null,
    2
  );

  const blob = new Blob(
    [dataStr],
    { type: "application/json" }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = "notes.json";

  link.click();

  URL.revokeObjectURL(url);
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

    const matchesSearch =
      note.title.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(search)
      );

    const matchesCategory =
      categoryFilter === "All" ||
      note.category === categoryFilter;

    return (
      matchesSearch &&
      matchesCategory
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

<div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "20px",
    boxShadow:
      "0 8px 20px rgba(99,102,241,.08)",
  }}
>
  <SearchBar
    searchTag={searchTag}
    setSearchTag={setSearchTag}
  />

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "15px",
      flexWrap: "wrap",
    }}
  >
    <select
      value={categoryFilter}
      onChange={(e) =>
        setCategoryFilter(
          e.target.value
        )
      }
    >
      <option value="All">
        📂 All
      </option>

      <option value="Study">
        📚 Study
      </option>

      <option value="Work">
        💼 Work
      </option>

      <option value="Personal">
        🏠 Personal
      </option>
    </select>

    <select
      value={sortBy}
      onChange={(e) =>
        setSortBy(
          e.target.value
        )
      }
    >
      <option value="newest">
        ↕ Newest
      </option>

      <option value="oldest">
        Oldest
      </option>

      <option value="az">
        A-Z
      </option>

      <option value="za">
        Z-A
      </option>

      <option value="pinned">
        📌 Pinned
      </option>
    </select>

    <button
      className="export-btn"
      onClick={exportNotes}
    >
      📤 Export
    </button>

    <button
  className="delete-btn"
  onClick={() =>
    setShowTrash(!showTrash)
  }
>
  🗑 Trash ({trash.length})
</button>
  </div>
</div>

<hr />

    <div
  className="notes-header"
  onClick={() =>
    setShowNotes(!showNotes)
  }
  style={{
    cursor: "pointer",
  }}
>
  <h2>
    {showNotes ? "▼" : "▶"} 📚 My Notes
  </h2>

  <p>
    {filteredNotes.length} Notes Available
  </p>
</div>
<p
  style={{
    textAlign: "center",
    color: "#0b0c0e",
    fontWeight: "500",
    marginTop: "5px",
  }}
>
  
</p>

<hr />


{showTrash && (
  <>
    <h2
      style={{
        textAlign: "center",
      }}
    >
      🗑 Trash
    </h2>

    {trash.map((note) => (
      <div
        key={note.id}
        className="note-card"
      >
        <h3>{note.title}</h3>

        <button
          className="edit-btn"
          onClick={() =>
            restoreNote(note.id)
          }
        >
          ↩ Restore
        </button>
      </div>
    ))}
  </>
)}

      {showNotes && (
  <>
    {filteredNotes.length === 0 ? (
      <div
  style={{
    textAlign: "center",
    padding: "50px 20px",
  }}
>
  <div style={{ fontSize: "60px" }}>
    📝
  </div>

  <h3>No Notes Yet</h3>

  <p>
    Create your first note and start
    organizing your ideas.
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
  📅 Created: {note.createdAt}
  {" • "}
  📝 {note.content.length} chars

  {note.updatedAt && (
    <>
      <br />
      ✏️ Updated: {note.updatedAt}
    </>
  )}
</small>

<p
  style={{
    color: "#6366f1",
    fontSize: "14px",
    fontWeight: 500,
    marginTop: "6px",
  }}
>
  {note.category === "Study" && "📚 Study"}
  {note.category === "Work" && "💼 Work"}
  {note.category === "Personal" && "🏠 Personal"}
</p>

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
  onClick={() => {
    if (
      window.confirm(
        "Are you sure you want to delete this note?"
      )
    ) {
      deleteNote(note.id);
    }
  }}
>
  🗑 Delete
</button>
        </div>
      </>
    )}
  </div>
))
      )}
  </>
)}
    </div>
  );
}

export default App;