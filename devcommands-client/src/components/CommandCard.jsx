import { useState, useRef, useEffect } from "react";


function CommandCard({ 
  command, 
  onToggle,
  isOpen,
  onOpen,
}) {
  const [isCopied, setIsCopied] = useState(false);
  
  const cardRef = useRef(null);

  useEffect(() => {
    if (isOpen && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [isOpen]);

  const renderTags = (tags = []) => {
    return (tags || []).map((tag) => (
      <span key={tag} style={styles.tag}>
        {tag.replace(/,/g, ", ")}
      </span>
    ));
  };


  return (
    <div
      ref={cardRef}
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
        <button
          tabIndex={0}
          aria-label={command.favorite 
            ? "Remove " + command.name + " as favorite" 
            : "Mark  " + command.name + " as favorite"}
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
        </button>

        <div style={{ flex: 1 }}>
          <div style={styles.headerRow}>
            
            <strong style={styles.commandName}>
              {command.name}
            </strong>
            <div style={styles.meta}>
              {command.difficulty}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(command.name);

                setIsCopied(true);

                setTimeout(() => {
                  setIsCopied(false);
                }, 1500);
              }}
              style={styles.copyButton}
              aria-label={`Copy ${command.name} command`}

            >
              {isCopied ? "Copied ✔️" : (
                "Copy Command"
              )}
            </button>

          </div>
          

          <div style={styles.description}>
            {command.summary}
          </div>
          <div style={styles.platform}>
              <h4>"{command.name}" can be used with: </h4>{command.tags?.tools.join(" | ")}
         
          </div>
         

          <div style={styles.infoGrid}>

              <div style={styles.column}>
                <div>
                  <strong>Context</strong>


                  <div style={styles.tagRow}>
                    {renderTags(command.tags?.context)}
                  </div>
                </div>

                <div>
                  <strong>Example Uses</strong>
                  <div style={styles.tagRow}>
                    {renderTags(command.tags?.intent)}
                  </div>


                  <ul style={styles.examplesList}>
                    {(command.exampleUses || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={styles.column}>
                <div>
                  <strong>Primary Tags</strong>

                  <div style={styles.tagRow}>
                    {renderTags(command.tags?.primary)}
                  </div>
                </div>

                <div>
                  <strong>Secondary Tags</strong>

                  <div style={styles.tagRow}>
                    {renderTags(command.tags?.secondary)}
                  </div>
                </div>
              </div>

            </div>
            </div>
            </div>


            <button
              style={styles.expandButton}
              onClick={() => {
                onOpen();

                setTimeout(() => {
                  cardRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                  });
                    },
                  150);
                  }}
                  aria-label={
                    isOpen
                      ? `Collapse ${command.name} examples`
                      : `Expand ${command.name} examples`
                  }
                  aria-expanded={isOpen}
            >
              {isOpen ? "Close" : `Common uses of "${command.name}"`}
            </button>

              {isOpen && command.variants?.length > 0 && (
            <div style={styles.variantsSection}>
            <strong> Common uses of "{command.name}"</strong>
              
              {(command.variants || []).map((variant, index) => (
                <div key={index} style={styles.variantCard}>
                  <code style={styles.codeBlock}>
                    {variant.command}
                  </code>
                  
                  <button
              onClick={() => {
                navigator.clipboard.writeText(`${variant.command}`);

                setIsCopied(true);

                setTimeout(() => {
                  setIsCopied(false);
                }, 1500);
              }}
              aria-label={`Copy variant command ${variant.command}`}
              style={styles.copyButton}
            >
              {isCopied ? "Copied ✔️" : (
                `Copy "${variant.command}"`
              )}
            </button>
            <div style={styles.meta}>
                    {variant.difficulty}
                  
                  <p style={styles.variantDescription}>
                    {variant.description}
                  </p>
            </div>
          </div>
              ))}
            </div>
          )}
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
    fontSize: "22px"
  },
  copyButton: {
    display: "flex",
    justifyContent: "flex-end",
    border: "none",
    borderRadius: "8px",
    background: "#111",
    color: "white", 
    cursor: "pointer",
    padding: "4px",
    marginBottom: "10px"
  },

copyIcon: {
  width: "18px",
  height: "18px"
},

  expandButton: {
    border: "none",
    borderRadius: "15px",
    width: "max-content",
    height: "30px",
    cursor: "pointer",
    background: "#111",
    color: "white",
    fontSize: "18px"
  },

  description: {
    display: "flex",
    fontSize: "14px",
    color: "#555",
    marginBottom: "14px"
  },

  infoGrid: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginTop: "16px",
  marginBottom: "20px"
},

column: {
  display: "flex",
  flexDirection: "column",
  gap: "16px"
},

examplesList: {
  marginTop: "8px",
  paddingLeft: "18px",
  color: "#555",
  fontSize: "14px",
  lineHeight: "1.5"
},


  platform: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
    fontSize: "14px",
    color: "#555",
    marginBottom: "16px"
},


  tagsWrapper: {
    display: "flex",
    alignItems: "flex-start",
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
