import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';

export const LoginScreen = ({ onNavigateToSignUp, onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o e-mail');
      return;
    }

    if (!senha) {
      Alert.alert('Erro', 'Por favor, preencha a senha');
      return;
    }

    setLoading(true);

    try {
      if (onLogin) {
        await onLogin(email.trim().toLowerCase(), senha);
        // Se chegou aqui, login foi bem-sucedido (navegação é feita no App.js)
      } else {
        Alert.alert('Erro', 'Sistema de login não configurado');
      }
    } catch (error) {
      Alert.alert('Erro no Login', error.message || 'E-mail ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo-cameleon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>EqualPath</Text>
          <Text style={styles.subtitle}>Oriente seu futuro profissional</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
            showPasswordIcon={true}
            onTogglePassword={() => setMostrarSenha(!mostrarSenha)}
          />

          <Button title="Entrar" onPress={handleLogin} loading={loading} disabled={loading} />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Ainda não tem conta? </Text>
            <TouchableOpacity onPress={onNavigateToSignUp}>
              <Text style={styles.signUpLink}>Criar conta aqui</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 16,
    color: colors.textLight,
  },
  signUpLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});
