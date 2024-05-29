import React from 'react';

const PlayerList = ({ players }) => {
  return (
    <div>
      <h2>Гравці</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name} {player.alive ? '(живий)' : '(мертвий)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
