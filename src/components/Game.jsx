import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import PlayerList from './PlayerList';

const socket = io('https://shielded-tor-68092-70329e44eb7c.herokuapp.com/');

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState({});
  const [role, setRole] = useState(null);
  const [phase, setPhase] = useState('waiting');

  useEffect(() => {
    socket.on('playerList', (players) => {
      setPlayers(players);
    });

    socket.on('gameStart', (players) => {
      const player = players.find(p => p.id === socket.id);
      if (player) {
        setRole(player.role);
      }
      setPlayers(players);
    });

    socket.on('phaseChange', (newPhase) => {
      setPhase(newPhase);
    });

    socket.on('nightResult', (result) => {
      console.log('Night result:', result);
    });

    socket.on('dayResult', (result) => {
      console.log('Day result:', result);
    });

    return () => {
      socket.off('playerList');
      socket.off('gameStart');
      socket.off('phaseChange');
      socket.off('nightResult');
      socket.off('dayResult');
    };
  }, []);

  const handleAction = (actionType, targetId) => {
    socket.emit(actionType, targetId);
  };

  const endNight = () => {
    socket.emit('endNight');
  };

  const endDay = () => {
    socket.emit('endDay');
  };

  return (
    <div>
      <h2>Фаза гри: {phase}</h2>
      <h3>Ваша роль: {role}</h3>
      <PlayerList players={players} />
      {phase === 'night' && role === 'mafia' && (
        <div>
          <h3>Виберіть жертву</h3>
          {players.filter(p => p.alive && p.id !== socket.id).map(player => (
            <button key={player.id} onClick={() => handleAction('mafiaKill', player.id)}>
              Вбити {player.name}
            </button>
          ))}
        </div>
      )}
      {phase === 'night' && role === 'doctor' && (
        <div>
          <h3>Виберіть, кого зберегти</h3>
          {players.filter(p => p.alive).map(player => (
            <button key={player.id} onClick={() => handleAction('doctorSave', player.id)}>
              Зберегти {player.name}
            </button>
          ))}
        </div>
      )}
      {phase === 'night' && role === 'detective' && (
        <div>
          <h3>Виберіть, кого перевірити</h3>
          {players.filter(p => p.alive && p.id !== socket.id).map(player => (
            <button key={player.id} onClick={() => handleAction('detectiveCheck', player.id)}>
              Перевірити {player.name}
            </button>
          ))}
        </div>
      )}
      {phase === 'day' && (
        <div>
          <h3>Голосування</h3>
          {players.filter(p => p.alive && p.id !== socket.id).map(player => (
            <button key={player.id} onClick={() => handleAction('vote', player.id)}>
              Голосувати за {player.name}
            </button>
          ))}
          <button onClick={endDay}>Завершити день</button>
        </div>
      )}
      {phase === 'night' && (
        <button onClick={endNight}>Завершити ніч</button>
      )}
    </div>
  );
};

export default Game;
