import CommandCard from "./CommandCard";
import { useState } from "react";

function CommandList({ commands, onToggle }) {
   if (commands.length === 0) {
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No commands found.
        </p>
      }


  const [openCardId, setOpenCardId] = useState(null);
  
  return (
    <div>
      
      
      {(commands || []).slice().sort((a, b) => a.name.localeCompare(b.name)).map((command) => (
        
        
        <CommandCard
          key={command.name}
          command={command}
          onToggle={onToggle}
          isOpen={openCardId === command.name}
          onOpen={() =>
            setOpenCardId(
              openCardId === command.name
              ? null
              : command.name
      )
    }
        />
        
      ))}
     
    </div>
    
  );
}

export default CommandList;