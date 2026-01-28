export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface ChatStore {
  currentUser: User;
  chats: Chat[];
  sendMessage: (chatId: string, text: string) => void;
  markAsRead: (chatId: string) => void;
}