interface SearchBarProps {
  searchTag: string;
  setSearchTag: (value: string) => void;
}

function SearchBar({ searchTag, setSearchTag }: SearchBarProps) {
  return (
    <div>
      <h2>Search Notes By Tag</h2>

      <input
        type="text"
        placeholder="Enter tag..."
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;