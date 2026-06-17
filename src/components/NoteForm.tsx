import { useEffect, useState } from "react";

interface NoteFormProps {
  onAddNote: (title: string, content: string, tags: string[]) => void;
  editingNote?: {
    title: string;
    content: string;
    tags: string[];
  } | null;
}

function NoteForm({
  onAddNote,
  editingNote,
}: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  useEffect(() => {
  if (editingNote) {
    setTitle(editingNote.title);
    setContent(editingNote.content);
    setTags(editingNote.tags.join(", "));
  }
}, [editingNote]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and Content are required");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onAddNote(title, content, tagArray);

    setTitle("");
    setContent("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">
  {editingNote ? "Update Note" : "Add Note"}
</button>
    </form>
  );
}

export default NoteForm;