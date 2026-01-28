import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import ChatScreen from './src/screens/ChatScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import { Chat } from './src/types';

export type RootStackParamList = {
  ChatList: undefined;
  Chat: { chat: Chat };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="ChatList">
        <Stack.Screen 
          name="ChatList" 
          component={ChatListScreen} 
          options={{ title: 'Messages' }}
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}
          options={({ route }) => ({ title: route.params.chat.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}