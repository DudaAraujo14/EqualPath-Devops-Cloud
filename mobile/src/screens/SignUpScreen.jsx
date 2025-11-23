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
} from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';

export const SignUpScreen = ({ onNavigateToLogin, onNavigateToProfile }) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome');
      return;
    }

    if (!sobrenome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o sobrenome');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o e-mail');
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido');
      return;
    }

    if (!senha) {
      Alert.alert('Erro', 'Por favor, preencha a senha');
      return;
    }

    if (senha.length < 5) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 5 caracteres');
      return;
    }

    if (!telefone.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o telefone');
      return;
    }

    onNavigateToProfile({
      nome,
      sobrenome,
      email,
      senha,
      telefone,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha seus dados pessoais</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome"
            placeholder="Seu nome"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <Input
            label="Sobrenome"
            placeholder="Seu sobrenome"
            value={sobrenome}
            onChangeText={setSobrenome}
            autoCapitalize="words"
          />

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

          <Input
            label="Telefone"
            placeholder="(11) 99999-9999"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Button title="Próximo" onPress={handleNext} loading={loading} disabled={loading} />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={onNavigateToLogin}>
              <Text style={styles.loginLink}>Entrar aqui</Text>
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 16,
    color: colors.textLight,
  },
  loginLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});
