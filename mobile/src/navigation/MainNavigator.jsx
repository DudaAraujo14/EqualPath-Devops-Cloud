import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { MinhasTrilhasScreen } from '../screens/MinhasTrilhasScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { TrilhasScreen } from '../screens/TrilhasScreen';
import { TrilhaDetalheScreen } from '../screens/TrilhaDetalheScreen';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = ({ onNavigateToTrilha }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain">
        {props => <HomeScreen {...props} onNavigateToTrilha={onNavigateToTrilha} />}
      </Stack.Screen>
      <Stack.Screen name="TrilhaDetalhe" component={TrilhaDetalheScreen} />
    </Stack.Navigator>
  );
};

export const MainNavigator = ({ onNavigateToTrilha, onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size || 24} color={color} />
          ),
        }}
      >
        {props => <HomeStack {...props} onNavigateToTrilha={onNavigateToTrilha} />}
      </Tab.Screen>
      <Tab.Screen
        name="Trilhas"
        options={{
          tabBarLabel: 'Trilhas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size || 24} color={color} />
          ),
        }}
      >
        {props => {
          const TrilhasStack = () => (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="TrilhasMain" component={TrilhasScreen} />
              <Stack.Screen name="TrilhaDetalhe" component={TrilhaDetalheScreen} />
            </Stack.Navigator>
          );
          return <TrilhasStack />;
        }}
      </Tab.Screen>
      <Tab.Screen
        name="MinhasTrilhas"
        options={{
          tabBarLabel: 'Minhas Trilhas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="book" size={size || 24} color={color} />
          ),
        }}
      >
        {props => {
          const MinhasTrilhasStack = () => (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MinhasTrilhasMain" component={MinhasTrilhasScreen} />
              <Stack.Screen name="TrilhaDetalhe" component={TrilhaDetalheScreen} />
            </Stack.Navigator>
          );
          return <MinhasTrilhasStack />;
        }}
      </Tab.Screen>
      <Tab.Screen
        name="Perfil"
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size || 24} color={color} />
          ),
        }}
      >
        {props => <PerfilScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
