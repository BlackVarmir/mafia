import React, { useState } from 'react';

const JoinGame = ({ onJoin }) => {
  const [playerName, setPlayerName] = useState('');

  const handleJoin = () => {
    if (playerName.trim()) {
      onJoin(playerName);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Ваше ім'я"
      />
      <button onClick={handleJoin}>Приєднатися до гри</button>
    </div>
  );
};

export default JoinGame;
