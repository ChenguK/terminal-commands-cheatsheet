import { useEffect, useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import CommandList from "./components/CommandList";
import AddCommandForm from "./components/AddCommandForm";
import {
  fetchCommands,
  toggleFavorite,
  createCommand
} from "./services/api";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [commands, setCommands] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const cache = {};

  const loadCommands = useCallback(async (search = "") => {
    // first page load
    if (commands.length === 0) {
      setInitialLoading(true);
    } else {
      setSearchLoading(true);
    }

  try {
    const data = await fetchCommands(search);
    setCommands(data.results || []);
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Error", err);
    }
  } finally {
    setInitialLoading(false);
    setSearchLoading(false);
  }
  }, [commands.length]);

  useEffect(() => {
    loadCommands();
  }, [loadCommands]);

  const handleToggle = async (name) => {
    // optimistic UI update
    setCommands((prev) =>
      prev.map((cmd) =>
        cmd.name === name
          ? { ...cmd, favorite: !cmd.favorite }
          : cmd
      )
    );

    try {
      await toggleFavorite(name);
    } catch (error) {
      // rollback if API fails
      loadCommands();
    }
  };

  const handleAdd = async (command) => {
    await createCommand(command);
    loadCommands();
    setShowForm(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>DevCommands</h1>

        <SearchBar onSearch={loadCommands} />
        {searchLoading && (
          <p style={styles.searching}>Searching...</p>
          )}

        <button
          style={styles.addButton}
          onClick={() => setShowForm((prev) => !prev)}
          onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
          onMouseLeave={(e) => (e.target.style.opacity = 1)}
        >
          ➕ Add to API
        </button>

        {showForm && <AddCommandForm onAdd={handleAdd} />}

        {initialLoading ? (
         <p style={styles.center}>Loading...</p>
        ) : commands.length === 0 ? (
          <p style={styles.center}>No commands found.</p>
        ) : (
          <CommandList commands={commands} onToggle={handleToggle} />
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    padding: "40px 20px"
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  },
  title: {
    marginBottom: "20px"
  },
  addButton: {
    marginBottom: "20px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#111",
    color: "white",
    cursor: "pointer"
  },
  center: {
    textAlign: "center"
  },
  searching: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px"
  }
};

export default App;

