// pages/index.js
import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import ModelSwitcher from '../components/ModelSwitcher';
import Navbar from '../components/Navbar';
import Settings from '../components/Settings';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('groq');
  const [userApiKey, setUserApiKey] = useState('');
  const [token, setToken] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <Navbar onToggleSettings={() => setShowSettings(!showSettings)} />
      {showSettings && (
        <Settings
          userApiKey={userApiKey}
          setUserApiKey={setUserApiKey}
          setToken={setToken}
        />
      )}
      <ModelSwitcher selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      <ChatWindow selectedModel={selectedModel} userApiKey={userApiKey} token={token} />
    </div>
  );
}
