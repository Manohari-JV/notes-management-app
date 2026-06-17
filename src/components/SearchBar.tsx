interface SearchBarProps {
  searchTag: string;
  setSearchTag: (value: string) => void;
}

function SearchBar({ searchTag, setSearchTag }: SearchBarProps) {
  return (
    <div>
      <h2 style={{ color: "black" }}>
  🔍 Search Notes
</h2>

      <input
        type="text"
        placeholder="Search notes, content, or tags..."
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;