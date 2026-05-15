export default function Sidebar({ sidebarOpen, setMessages }) {
  return (
    <div
      style={{
        width: sidebarOpen ? 250 : 0,
        overflow: "hidden",
        transition: "0.3s",
        background: "#111",
        color: "white",
      }}
    >
      <h3 style={{ padding: 10 }}>MindCBT</h3>

      <button onClick={() => setMessages([])} style={{ margin: 10 }}>
        New Chat
      </button>

      <div style={{ padding: 10 }}>
        <p>• Anxiety Session</p>
        <p>• Depression Support</p>
        <p>• CBT Practice</p>
      </div>
    </div>
  );
}