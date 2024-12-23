import React, { createContext } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io('http://localhost:8080');

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};