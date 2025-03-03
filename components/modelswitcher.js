// components/ModelSwitcher.js
export default function ModelSwitcher({ selectedModel, setSelectedModel }) {
  return (
    <div style={{ padding: '1rem', background: '#fff', margin: '1rem' }}>
      <label htmlFor="model-select" style={{ marginRight: '0.5rem' }}>Select AI Model:</label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      >
        <option value="groq">GROQ</option>
        <option value="together">Together AI</option>
        <option value="chatgpt">ChatGPT</option>
      </select>
    </div>
  );
}
