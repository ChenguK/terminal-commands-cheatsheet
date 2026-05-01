function CommandCard({ command, onToggle }) {
  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >

      <div style={styles.row}>
        <span
          style={{
            ...styles.star,
            color: command.favorite ? "gold" : "#ccc"
          }}
          onClick={() => onToggle(command.name)}
        >
          ★
        </span>

        <div>
          <strong>{command.name}</strong>
         <div>
            <div>
              <strong>Primary:</strong>
              {command.tags.primary.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div>
              <strong>Secondary:</strong>
              {command.tags.secondary.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div>
              <strong>Context:</strong>
              {command.tags.context.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={styles.description}>
            {command.description}
            
          </div>
        </div>
      </div>

      <div style={styles.meta}>
        {command.difficulty}
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: "16px",
    border: "1px solid #eee",
    borderRadius: "10px",
    marginBottom: "12px",
    transition: "all 0.2s ease",
    background: "#fff"
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px"
  },
  star: {
    cursor: "pointer",
    fontSize: "18px"
  },
  description: {
    fontSize: "14px",
    color: "#555"
  },
  meta: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#888"
  }
};
export default CommandCard;
