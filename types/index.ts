export interface User {
  id: string;
  name: string;
  avatar?: string;
  lastSeen?: Date;
}

export interface ChatRoom {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export type RootStackParamList = {
  Messages: undefined;
  ChatRoom: { roomId: string; roomName?: string };
};
