function CommandCard({ command, onToggle }) {
  return (
    <div
    style={{
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginBottom: "10px"
  }}
>

      <strong>{command.name}</strong> — {command.description}
      <br />
      Difficulty: {command.difficulty}
    </div>
  );
}

export default CommandCard;
