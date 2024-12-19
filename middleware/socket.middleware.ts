// socketMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { addMessage, setTyping } from "../redux/slices/chatSlice";

let socket: Socket | null = null;

export const socketMiddleware: Middleware =
  (storeAPI) => (next) => (action: any) => {
    if (action.type === "socket/connect") {
      socket = io("http://your-backend-url");

      socket.on("message", (message) => {
        storeAPI.dispatch(addMessage(message));
      });

      socket.on("typing", (isTyping) => {
        storeAPI.dispatch(setTyping(isTyping));
      });
    }

    if (action.type === "socket/sendMessage") {
      socket?.emit("message", action.payload);
    }

    if (action.type === "socket/disconnect") {
      socket?.disconnect();
      socket = null;
    }

    return next(action);
  };
