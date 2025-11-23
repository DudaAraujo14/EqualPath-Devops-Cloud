import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { SignUpProfileScreen } from './src/screens/SignUpProfileScreen';
import { MainNavigator } from './src/navigation/MainNavigator';
import { colors } from './src/styles/colors';
import { isAuthenticated, loginUser, logoutUser } from './src/services/authService';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(null);
  const [signUpData, setSignUpData] = useState(null);

  const checkAuth = async () => {
    try {
      const authenticated = await isAuthenticated();
      setCurrentScreen(authenticated ? 'home' : 'login');
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setCurrentScreen('login');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const navigateToSignUp = () => {
    setSignUpData(null);
    setCurrentScreen('signup');
  };

  const navigateToLogin = () => {
    setSignUpData(null);
    setCurrentScreen('login');
  };

  const navigateToProfile = data => {
    setSignUpData(data);
    setCurrentScreen('signupProfile');
  };

  const handleLogin = async (email, senha) => {
    try {
      await loginUser(email, senha);
      setCurrentScreen('home');
    } catch (error) {
      throw error;
    }
  };

  const navigateToTrilha = trilhaId => {
    console.log('Navegar para trilha:', trilhaId);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentScreen('login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setCurrentScreen('login');
    }
  };

  if (currentScreen === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando...</Text>
        <StatusBar style="light" backgroundColor={colors.primary} />
      </View>
    );
  }

  if (currentScreen === 'home') {
    return (
      <>
        <NavigationContainer independent={true}>
          <MainNavigator onNavigateToTrilha={navigateToTrilha} onLogout={handleLogout} />
        </NavigationContainer>
        <StatusBar style="light" backgroundColor={colors.primary} />
      </>
    );
  }

  return (
    <>
      {currentScreen === 'login' && (
        <LoginScreen onNavigateToSignUp={navigateToSignUp} onLogin={handleLogin} />
      )}
      {currentScreen === 'signup' && (
        <SignUpScreen onNavigateToLogin={navigateToLogin} onNavigateToProfile={navigateToProfile} />
      )}
      {currentScreen === 'signupProfile' && (
        <SignUpProfileScreen
          userData={signUpData}
          onNavigateToLogin={navigateToLogin}
          onComplete={() => setCurrentScreen('home')}
        />
      )}
      <StatusBar style="light" backgroundColor={colors.primary} />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textLight,
  },
});
