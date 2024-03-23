'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface PlayerTokenContextType {
  playerToken: string;
  setPlayerToken: (token: string) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  tibars: number;
  setTibars: (tibars: number) => void;
}

const PlayerTokenContext = createContext<PlayerTokenContextType | undefined>(undefined);

export const PlayerTokenProvider = ({ children }: { children: ReactNode }) => {
  const [playerToken, setPlayerToken] = useState('');
  const [update, setUpdate] = useState(false);
  const [tibars, setTibars] = useState(0);

  return (
    <PlayerTokenContext.Provider value={{ playerToken, setPlayerToken, update, setUpdate, tibars, setTibars }}>
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
