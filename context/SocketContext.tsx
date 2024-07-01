"use client";
// context/SocketContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import socketService from "../services/socket";
import { useUserContext } from "./UserContext";

interface SocketContextProps {
  socketService: typeof socketService;
  isConnected: boolean;
  connect: () => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);

  const accessToken = useUserContext().userData?.access_token;

  const connect = useCallback(() => {
    const authToken = accessToken; // Or use another method to retrieve the token
    if (authToken) {
      console.log(authToken);
      console.log("Connecting to WebSocket with token:", authToken);
      socketService.connect(process.env.NEXT_PUBLIC_API_SOCKET_URL!, authToken);

      socketService.on("connected", () => {
        setIsConnected(true);
        console.log("Connected to the WebSocket server successfully!");
      });
    } else {
      console.error("No authentication token found!");
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socketService, isConnected, connect }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
