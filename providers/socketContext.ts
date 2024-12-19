// // src/context/SocketContext.tsx
// import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SOCKET_URL = 'http://localhost:4000'; // Replace with your server URL

// // Create a context type for the socket
// interface SocketContextType {
//     socket: Socket | null;
// }

// // Create the context with a default value of null
// const SocketContext = createContext<SocketContextType | null>(null);

// // Define the props for the SocketProvider component
// interface SocketProviderProps {
//     children: ReactNode;
// }

// export const SocketProvider = ({ children }: {children: ReactNode}) => {
//     const socketRef = useRef<Socket | null>(null);

//     useEffect(() => {
//         // Initialize socket connection
//         socketRef.current = io(SOCKET_URL);

//         return () => {
//             socketRef.current?.disconnect(); // Clean up on unmount
//         };
//     }, []);

//     return (
//         <SocketContext.Provider value={{ socket: socketRef.current }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// // Custom hook to use the socket context
// export const useSocket = (): Socket | null => {
//     const context = useContext(SocketContext);
//     if (!context) {
//         throw new Error('useSocket must be used within a SocketProvider');
//     }
//     return context.socket;
// };
