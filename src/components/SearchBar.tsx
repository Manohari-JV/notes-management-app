import TextField from "@mui/material/TextField";


interface SearchBarProps {
  searchTag: string;
  setSearchTag: (value: string) => void;
}

function SearchBar({
  searchTag,
  setSearchTag,
}: SearchBarProps) {
  return (
    <div style={{ margin: "20px 0" }}>
      <TextField
  fullWidth
  variant="outlined"
  placeholder="🔍 Search notes, content, or tags..."
  value={searchTag}
  onChange={(e) =>
    setSearchTag(e.target.value)
  }
/>
    </div>
  );
}

export default SearchBar;