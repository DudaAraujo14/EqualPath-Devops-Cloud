import { getCurrentUser, updateCurrentUser } from '../services/authService';

export const getUserData = async () => {
  return await getCurrentUser();
};

export const setUserData = async data => {
  return await updateCurrentUser(data);
};

export const clearUserData = async () => {
  return true;
};
export const adicionarTrilha = async trilhaId => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;

  if (!currentUser.minhasTrilhas) {
    currentUser.minhasTrilhas = [];
  }

  if (!currentUser.minhasTrilhas.includes(trilhaId)) {
    currentUser.minhasTrilhas.push(trilhaId);
    await updateCurrentUser({ minhasTrilhas: currentUser.minhasTrilhas });
  }
};

export const removerTrilha = async trilhaId => {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.minhasTrilhas) return;

  const updatedTrilhas = currentUser.minhasTrilhas.filter(id => id !== trilhaId);
  await updateCurrentUser({ minhasTrilhas: updatedTrilhas });
};

export const getMinhasTrilhas = async () => {
  const currentUser = await getCurrentUser();
  return currentUser?.minhasTrilhas || [];
};

export const estaSeguindoTrilha = async trilhaId => {
  const currentUser = await getCurrentUser();
  return currentUser?.minhasTrilhas?.includes(trilhaId) || false;
};

export const concluirTrilha = async trilhaId => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;

  if (!currentUser.trilhasConcluidas) {
    currentUser.trilhasConcluidas = [];
  }

  if (!currentUser.trilhasConcluidas.includes(trilhaId)) {
    currentUser.trilhasConcluidas.push(trilhaId);
    await updateCurrentUser({ trilhasConcluidas: currentUser.trilhasConcluidas });
  }
};

export const desmarcarTrilhaConcluida = async trilhaId => {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.trilhasConcluidas) return;

  const updatedTrilhas = currentUser.trilhasConcluidas.filter(id => id !== trilhaId);
  await updateCurrentUser({ trilhasConcluidas: updatedTrilhas });
};

export const getTrilhasConcluidas = async () => {
  const currentUser = await getCurrentUser();
  return currentUser?.trilhasConcluidas || [];
};

export const estaTrilhaConcluida = async trilhaId => {
  const currentUser = await getCurrentUser();
  return currentUser?.trilhasConcluidas?.includes(trilhaId) || false;
};
