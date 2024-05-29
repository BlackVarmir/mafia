import React, { useState } from 'react';
import JoinGame from './components/JoinGame';
import Game from './components/Game';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('https://shielded-tor-68092-70329e44eb7c.herokuapp.com/');

function App() {
  const [joined, setJoined] = useState(false);

  const handleJoin = (playerName) => {
    socket.emit('joinGame', playerName);
    setJoined(true);
  };

  return (
    <div className="App">
      <h1>Мафія</h1>
      {joined ? <Game /> : <JoinGame onJoin={handleJoin} />}
    </div>
  );
}

export default App;
