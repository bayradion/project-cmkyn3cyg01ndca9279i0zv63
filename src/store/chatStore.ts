import { create } from 'zustand';
import { ChatStore, User, Chat, Message } from '../types';

const currentUser: User = {
  id: 'user-1',
  name: 'You',
  avatar: 'https://i.pravatar.cc/150?img=1',
  isOnline: true,
};

const mockUsers: User[] = [
  {
    id: 'user-2',
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isOnline: true,
  },
  {
    id: 'user-3',
    name: 'Bob Smith',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isOnline: false,
  },
  {
    id: 'user-4',
    name: 'Carol Davis',
    avatar: 'https://i.pravatar.cc/150?img=4',
    isOnline: true,
  },
];

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    text: 'Hey! How are you doing?',
    userId: 'user-2',
    timestamp: new Date(Date.now() - 3600000),
    isRead: true,
  },
  {
    id: 'msg-2',
    text: 'I\'m doing great, thanks for asking! How about you?',
    userId: 'user-1',
    timestamp: new Date(Date.now() - 3300000),
    isRead: true,
  },
  {
    id: 'msg-3',
    text: 'Pretty good! Just working on some new projects. Want to grab coffee later?',
    userId: 'user-2',
    timestamp: new Date(Date.now() - 3000000),
    isRead: true,
  },
  {
    id: 'msg-4',
    text: 'That sounds perfect! I\'d love to catch up.',
    userId: 'user-1',
    timestamp: new Date(Date.now() - 2700000),
    isRead: true,
  },
  {
    id: 'msg-5',
    text: 'Great! How about 3 PM at the usual place?',
    userId: 'user-2',
    timestamp: new Date(Date.now() - 1800000),
    isRead: false,
  },
];

const mockChats: Chat[] = [
  {
    id: 'chat-1',
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?img=2',
    participants: [currentUser, mockUsers[0]],
    messages: mockMessages,
    lastMessage: mockMessages[mockMessages.length - 1],
    unreadCount: 1,
  },
  {
    id: 'chat-2',
    name: 'Bob Smith',
    avatar: 'https://i.pravatar.cc/150?img=3',
    participants: [currentUser, mockUsers[1]],
    messages: [
      {
        id: 'msg-6',
        text: 'Did you see the game last night?',
        userId: 'user-3',
        timestamp: new Date(Date.now() - 7200000),
        isRead: true,
      },
    ],
    lastMessage: {
      id: 'msg-6',
      text: 'Did you see the game last night?',
      userId: 'user-3',
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    name: 'Carol Davis',
    avatar: 'https://i.pravatar.cc/150?img=4',
    participants: [currentUser, mockUsers[2]],
    messages: [
      {
        id: 'msg-7',
        text: 'Thanks for your help with the presentation!',
        userId: 'user-4',
        timestamp: new Date(Date.now() - 86400000),
        isRead: true,
      },
      {
        id: 'msg-8',
        text: 'You\'re welcome! It turned out great.',
        userId: 'user-1',
        timestamp: new Date(Date.now() - 82800000),
        isRead: true,
      },
    ],
    lastMessage: {
      id: 'msg-8',
      text: 'You\'re welcome! It turned out great.',
      userId: 'user-1',
      timestamp: new Date(Date.now() - 82800000),
      isRead: true,
    },
    unreadCount: 0,
  },
];

export const useChatStore = create<ChatStore>((set, get) => ({
  currentUser,
  chats: mockChats,
  
  sendMessage: (chatId: string, text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      userId: currentUser.id,
      timestamp: new Date(),
      isRead: true,
    };

    set(state => ({
      chats: state.chats.map(chat => 
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage,
            }
          : chat
      ),
    }));
  },

  markAsRead: (chatId: string) => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              unreadCount: 0,
              messages: chat.messages.map(msg => ({ ...msg, isRead: true })),
            }
          : chat
      ),
    }));
  },
}));