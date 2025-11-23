import AsyncStorage from '@react-native-async-storage/async-storage';
import { capitalizeWords } from '../utils/stringUtils';

const USERS_KEY = '@equalpath:users';
const CURRENT_USER_KEY = '@equalpath:currentUser';

/**
 * Busca todos os usuários cadastrados
 */
export const getUsers = async () => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

/**
 * Salva um novo usuário
 */
export const saveUser = async userData => {
  try {
    const normalizedEmail = (userData.email || '').trim().toLowerCase();
    const users = await getUsers();

    const userExists = users.find(u => {
      const userEmailNormalized = (u.email || '').trim().toLowerCase();
      return userEmailNormalized === normalizedEmail;
    });

    if (userExists) {
      throw new Error('Este e-mail já está cadastrado');
    }

    const newUser = {
      id: Date.now().toString(),
      nome: capitalizeWords(userData.nome),
      sobrenome: capitalizeWords(userData.sobrenome),
      email: normalizedEmail,
      senha: userData.senha,
      telefone: userData.telefone || '',
      areasSelecionadas: userData.areasSelecionadas || [],
      skillsSelecionadas: userData.skillsSelecionadas || [],
      minhasTrilhas: [],
      trilhasConcluidas: [],
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

    return newUser;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw error;
  }
};

/**
 * Realiza login do usuário
 */
export const loginUser = async (email, senha) => {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const users = await getUsers();
    const user = users.find(u => {
      const userEmailNormalized = (u.email || '').trim().toLowerCase();
      return userEmailNormalized === normalizedEmail && u.senha === senha;
    });

    if (!user) {
      throw new Error('E-mail ou senha incorretos');
    }

    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

/**
 * Busca o usuário atual logado
 */
export const getCurrentUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    return null;
  }
};

/**
 * Atualiza os dados do usuário atual
 */
export const updateCurrentUser = async updatedData => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Nenhum usuário logado');
    }

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    const updatedUser = { ...currentUser, ...updatedData };
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    return updatedUser;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

/**
 * Realiza logout do usuário
 */
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = async () => {
  try {
    const currentUser = await getCurrentUser();
    return currentUser !== null;
  } catch (error) {
    return false;
  }
};
