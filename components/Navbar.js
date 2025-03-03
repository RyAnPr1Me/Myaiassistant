// components/Navbar.js
export default function Navbar({ onToggleSettings }) {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>AI Assistant</h1>
      <button onClick={onToggleSettings} style={{ padding: '0.5rem 1rem', background: '#555', border: 'none', borderRadius: '4px', color: '#fff' }}>
        Settings
      </button>
    </nav>
  );
}
