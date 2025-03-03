// components/ChatWindow.js
import { useState } from 'react';
import axios from 'axios';

export default function ChatWindow({ selectedModel, userApiKey, token }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newHistory = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newHistory);
    setMessage('');
    try {
      const res = await axios.post('/api/ai', {
        query: message,
        model: selectedModel,
        userApiKey
      });
      const responseText = res.data.response;
      setChatHistory((prev) => [...prev, { sender: 'assistant', text: responseText }]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'assistant', text: err.response?.data?.error || 'Error occurred' }
      ]);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Chat with AI</h2>
      <div style={{
          border: '1px solid #ccc',
          padding: '1rem',
          background: '#fff',
          minHeight: '300px',
          overflowY: 'auto'
        }}>
        {chatHistory.map((msg, idx) => (
          <p key={idx} style={{
            textAlign: msg.sender === 'user' ? 'right' : 'left',
            margin: '0.5rem 0'
          }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Assistant'}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div style={{ marginTop: '1rem', display: 'flex' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flexGrow: 1, padding: '0.5rem' }}
        />
        <button onClick={sendMessage} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
          Send
        </button>
      </div>
    </div>
  );
}
