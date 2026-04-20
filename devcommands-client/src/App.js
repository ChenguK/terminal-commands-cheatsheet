import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CommandList from "./components/CommandList";
import AddCommandForm from "./components/AddCommandForm";
import {
  fetchCommands,
  toggleFavorite,
  createCommand
} from "./services/api";

const [loading, setLoading] = useState(false);
const [commands, setCommands] = useState([]);
const [showForm, setShowForm] = useState(false);

function App() {
  const [commands, setCommands] = useState([]);

  const loadCommands = async (search = "") => {
    setLoading(true);
    const data = await fetchCommands(search);
    setCommands(data.results || []);
    setLoading(false);
  };
  <button onClick={() => setShowForm((prev) => !prev)} {...showForm && < AddCommandForm onAdd={handleAdd} /> } >
      ➕ Add to API
  </button>
  useEffect(() => {
    loadCommands();
  }, []);

  const handleToggle = async (name) => {
    // Instant UI update
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
      // rollaback if API call fails
    loadCommands();
  }
};


  const handleAdd = async (command) => {
    await createCommand(command);
    loadCommands();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>DevCommands</h1>

      <SearchBar onSearch={loadCommands} />
      {loading ? (
        <p>Loading...</p> 
      ) :commands.length === 0 ? (
        <p>No commands found.</p>
      ) : (

      <CommandList
        commands={commands}
        onToggle={handleToggle}
      />
  )};
  </div> 
  );
}
export default App;




