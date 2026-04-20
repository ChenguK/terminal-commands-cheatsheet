import { useState, useEffect, useRef } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const timeoutRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
   
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
    return () => clearTimeout(timeoutRef.current);
  }, [value, onSearch]);

  //Instant search on button click
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(timeoutRef.current);
      onSearch(value);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search commands..."
      /> 
    </div>
  );
}

export default SearchBar;
