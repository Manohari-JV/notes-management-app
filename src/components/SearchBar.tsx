import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

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
        onChange={(e) => setSearchTag(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default SearchBar;