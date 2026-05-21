import { useState } from "react";

function AddCommandForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    difficulty: "beginner"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", description: "", tools: [], tags: [], exampleUses: [], difficulty: "Beginner" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
    <div>
      <input
        placeholder="Command name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
    </div>
  
    <div>
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
    </div>
    <div>
      <input
        placeholder="Can be used with: (comma-separated)"
        value={form.tools}
        onChange={(e) =>
          setForm({ ...form, tools: e.target.value })
        }
      />
    </div>
     <div>
      <input
        placeholder="Context (comma-separated)"
        value={form.context}
        onChange={(e) =>
          setForm({ ...form, context: e.target.value })
        }
      />
    </div>
     <div>
      <input
        placeholder="Example Uses (comma-separated)"
        value={form.intent}
        onChange={(e) =>
          setForm({ ...form, intent: e.target.value })
        }
      />
    </div>
    <div>
      <input
        placeholder="Primary Tags (comma-separated)"
        value={form.tags}
        onChange={(e) =>
          setForm({ ...form, tags: e.target.value })
        }
      />
    </div>
    <div>
      <input
        placeholder="Secondary Tags (comma-separated)"
        value={form.tags}
        onChange={(e) =>
          setForm({ ...form, tags: e.target.value })
        }
      />
    </div>
   
    


    <div>
      <select
        value={form.difficulty}
        onChange={(e) =>
          setForm({ ...form, difficulty: e.target.value })
        }
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>

    <button type="submit">Submit</button>
</form>

  );
}
const styles = {
  form: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fafafa"
  }
};


export default AddCommandForm;