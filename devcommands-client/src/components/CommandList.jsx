import CommandCard from "./CommandCard";

function CommandList({ commands, onToggle }) {
  return (
    <div>
      {commands.map((cmd) => (
        <CommandCard
          key={cmd._id}
          command={cmd}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default CommandList;