import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import { Chat } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function ChatListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const chats = useChatStore(state => state.chats);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <View style={styles.chatItemWrapper}>
      <Pressable
        style={styles.chatItem}
        onPress={() => navigation.navigate('Chat', { chat: item })}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.participants[1]?.isOnline && (
            <View style={styles.onlineIndicator} />
          )}
        </View>
        
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            {item.lastMessage && (
              <Text style={styles.timestamp}>
                {formatTimestamp(item.lastMessage.timestamp)}
              </Text>
            )}
          </View>
          
          <View style={styles.messagePreview}>
            {item.lastMessage && (
              <Text 
                style={[
                  styles.lastMessage,
                  item.unreadCount > 0 && styles.unreadMessage
                ]}
                numberOfLines={1}
              >
                {item.lastMessage.text}
              </Text>
            )}
            
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>
                  {item.unreadCount > 99 ? '99+' : item.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderChatItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  chatItemWrapper: {
    backgroundColor: theme.colors.background,
  },
  chatItem: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.online,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  chatName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: theme.typography.caption.fontSize + 1,
    color: theme.colors.textSecondary,
  },
  unreadMessage: {
    fontWeight: '600',
    color: theme.colors.text,
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  unreadCount: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.background,
    fontWeight: '600',
  },
});