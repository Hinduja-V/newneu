export default function MessageList({ messages, loading }) {
  return (
    <div style={styles.chat}>
      {messages.length === 0 && (
        <div style={styles.empty}>
          <h2>🧠 CBT AI Assistant</h2>
          <p>Share your thoughts, I'm here to help you 💙</p>
        </div>
      )}

      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            ...styles.row,
            justifyContent:
              msg.role === "user" ? "flex-end" : "flex-start",
          }}
        >
          <div
            style={{
              ...styles.bubble,
              background:
                msg.role === "user"
                  ? "linear-gradient(135deg,#4f7aff,#7c5eff)"
                  : "#13161f",
              border:
                msg.role === "user"
                  ? "none"
                  : "1px solid #1e2130",
            }}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {loading && (
        <div style={styles.row}>
          <div style={styles.bubble}>Thinking...</div>
        </div>
      )}
    </div>
  );
}

const styles = {
  chat: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    color: "#fff",
  },
  row: {
    display: "flex",
    marginBottom: "10px",
  },
  bubble: {
    padding: "12px",
    borderRadius: "12px",
    maxWidth: "60%",
    color: "#fff",
  },
  empty: {
    textAlign: "center",
    marginTop: "100px",
    color: "#7a80a0",
  },
};