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


export interface UserData {
  id: string;
  email: string;
  // ... add other user properties
}

export interface AuthResponse {
  token: string;
  user: UserData;
}

export interface AuthState {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export type RootStackParamList = {
  Messages: undefined;
  ChatRoom: { roomId: string; roomName?: string };
};
