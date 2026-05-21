import { useState, useEffect, useRef } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const timeoutRef = useRef(null);

  // Debounce search input
  useEffect(() => {
  timeoutRef.current = setTimeout(() => {
    onSearch(value);
  }, 300);

  return () => clearTimeout(timeoutRef.current);
}, [value]);

  //Instant search on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      clearTimeout(timeoutRef.current);
      onSearch(value);
    }
  };

  return (
    <div style={ styles.wrapper }>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search commands..."
        style={styles.input}
        aria-label="Search development commands"
      /> 
    </div>
  );
}
const styles = {
  wrapper: {
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px"
  }
};


export default SearchBar;