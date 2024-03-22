'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface PlayerTokenContextType {
  playerToken: string;
  setPlayerToken: (token: string) => void;
}

const PlayerTokenContext = createContext<PlayerTokenContextType | undefined>(undefined);

export const PlayerTokenProvider = ({ children }: { children: ReactNode }) => {
  const [playerToken, setPlayerToken] = useState('');

  return (
    <PlayerTokenContext.Provider value={{ playerToken, setPlayerToken }}>
      {children}
    </PlayerTokenContext.Provider>
  );
};

export const usePlayerToken = () => {
  const context = useContext(PlayerTokenContext);
  if (context === undefined) {
    throw new Error('usePlayerToken must be used within a PlayerTokenProvider');
  }
  return context;
};
