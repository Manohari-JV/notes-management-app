import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";

interface NoteFormProps {
  onAddNote: (
    title: string,
    content: string,
    tags: string[]
  ) => void;
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

  const handleSubmit = (
    e: React.FormEvent
  ) => {
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
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 3,
        marginBottom: 3,
      }}
    >
      <Typography
  variant="h5"
  gutterBottom
  align="center"
  sx={{
    fontWeight: 600,
    color: "#4338ca",
    mb: 3,
  }}
>
        {editingNote
          ? "Edit Note"
          : "Create Note"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Content"
          margin="normal"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <TextField
          fullWidth
          label="Tags (comma separated)"
          margin="normal"
          value={tags}
          onChange={(e) =>
            setTags(e.target.value)
          }
        />

        <Button
  variant="contained"
  size="large"
  type="submit"
  sx={{
    mt: 2,
    display: "block",
    mx: "auto",
    background:
      "linear-gradient(135deg, #6366f1, #8b5cf6)",
    borderRadius: "12px",
    padding: "10px 24px",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "15px",
    boxShadow:
      "0 4px 12px rgba(99,102,241,0.3)",

    "&:hover": {
      background:
        "linear-gradient(135deg, #4f46e5, #7c3aed)",
    },
  }}
>
  {editingNote ? "✨ Update Note" : "➕ Add Note"}
</Button>
      </form>
    </Paper>
  );
}

export default NoteForm;