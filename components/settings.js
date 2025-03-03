// components/Settings.js
import { useState } from 'react';
import axios from 'axios';

export default function Settings({ userApiKey, setUserApiKey, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('login');

  const handleAuth = async () => {
    try {
      const res = await axios.post('/api/auth', { action, username, password });
      if (action === 'login' && res.data.token) {
        setToken(res.data.token);
        alert('Login successful.');
      } else {
        alert(res.data.message || 'Action successful.');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Authentication error');
    }
  };

  return (
    <div style={{ padding: '1rem', background: '#f0f0f0' }}>
      <h2>Settings</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Your ChatGPT API Key: </label>
        <input
          type="text"
          value={userApiKey}
          onChange={(e) => setUserApiKey(e.target.value)}
          placeholder="Enter ChatGPT API key"
          style={{ width: '300px', padding: '0.5rem' }}
        />
      </div>
      <div>
        <h3>Authentication</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <select value={action} onChange={(e) => setAction(e.target.value)} style={{ padding: '0.5rem', marginRight: '0.5rem' }}>
          <option value="login">Login</option>
          <option value="register">Register</option>
        </select>
        <button onClick={handleAuth} style={{ padding: '0.5rem 1rem' }}>Submit</button>
      </div>
    </div>
  );
}
