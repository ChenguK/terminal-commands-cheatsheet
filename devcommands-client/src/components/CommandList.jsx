import CommandCard from "./CommandCard";

function CommandList({ commands, onToggle }) {
  return (
    <div>
      
      {(commands || []).map((cmd) => (
        
        <CommandCard
          key={cmd._id}
          command={cmd}
          onToggle={onToggle}
        />
        
      ))}
      if (commands.length === 0) {
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No commands found.
        </p>
      }
    </div>
    
  );
}

export default CommandList;