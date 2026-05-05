import { useState } from "react";

function CommandCard({ command, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  const renderTags = (tags = []) => {
    return (tags || []).map((tag) => (
      <span key={tag} style={styles.tag}>
        {tag.replace(/,/g, ", ")}
      </span>
    ));
  };

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
          onClick={(e) => {
            e.stopPropagation();
            onToggle(command.name);
          }}
        >
          ★
        </span>

        <div style={{ flex: 1 }}>
          <div style={styles.headerRow}>
            <strong style={styles.commandName}>
              {command.name}
            </strong>

            <button
              style={styles.expandButton}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "−" : "+"}
            </button>
          </div>

          <div style={styles.description}>
            {command.description}
          </div>

          <div style={styles.tagsWrapper}>
            <div>
              <strong>Primary:</strong>
              <div style={styles.tagRow}>
                {renderTags(command.tags?.primary)}
              </div>
            </div>

            <div>
              <strong>Secondary:</strong>
              <div style={styles.tagRow}>
                {renderTags(command.tags?.secondary)}
              </div>
            </div>

            <div>
              <strong>Context:</strong>
              <div style={styles.tagRow}>
                {renderTags(command.tags?.context)}
              </div>
            </div>
          </div>

          {expanded && command.variants?.length > 0 && (
            <div style={styles.variantsSection}>
              <strong>Variants</strong>

              {(command.variants || []).map((variant, index) => (
                <div key={index} style={styles.variantCard}>
                  <code style={styles.codeBlock}>
                    {variant.command}
                  </code>

                  <p style={styles.variantDescription}>
                    {variant.description}
                  </p>
                </div>
              ))}
            </div>
          )}
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

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },

  commandName: {
    fontSize: "18px"
  },

  expandButton: {
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    background: "#111",
    color: "white",
    fontSize: "18px"
  },

  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "14px"
  },

  tagsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "6px"
  },

  tag: {
    background: "#eef2ff",
    color: "#3730a3",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px"
  },

  variantsSection: {
    marginTop: "18px",
    borderTop: "1px solid #eee",
    paddingTop: "14px"
  },

  variantCard: {
    background: "#f8fafc",
    borderRadius: "8px",
    padding: "12px",
    marginTop: "10px",
    border: "1px solid #e2e8f0"
  },

  codeBlock: {
    display: "block",
    marginBottom: "8px",
    color: "#2563eb",
    fontWeight: "bold"
  },

  variantDescription: {
    margin: 0,
    fontSize: "14px",
    color: "#444"
  },

  meta: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#888"
  }
};

export default CommandCard;
