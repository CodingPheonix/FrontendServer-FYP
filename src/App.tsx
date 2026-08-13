import React from 'react';
import './App.css';
import VoiceAgent from './pages/VoiceAgent';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f7fa' }}>
      <VoiceAgent />
    </div>
  );
}

export default App;
