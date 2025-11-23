import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { getUserData, setUserData, getTrilhasConcluidas, getMinhasTrilhas } from '../data/userData';
import { AREAS, SKILLS, getSuggestedSkills } from '../data/areasAndSkills';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { capitalizeWords } from '../utils/stringUtils';

export const PerfilScreen = ({ onLogout, navigation }) => {
  const [userData, setUserDataState] = useState(null);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [estatisticas, setEstatisticas] = useState({ trilhasConcluidas: 0, trilhasEmProgresso: 0 });

  // Estados para edição
  const [nomeEditado, setNomeEditado] = useState('');
  const [sobrenomeEditado, setSobrenomeEditado] = useState('');
  const [emailEditado, setEmailEditado] = useState('');
  const [telefoneEditado, setTelefoneEditado] = useState('');
  const [selectedAreasEditado, setSelectedAreasEditado] = useState([]);
  const [selectedSkillsEditado, setSelectedSkillsEditado] = useState([]);

  // Estados para modais
  const [modalAreaVisible, setModalAreaVisible] = useState(false);
  const [modalSkillVisible, setModalSkillVisible] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  // Recarregar estatísticas quando a tela ganhar foco
  useEffect(() => {
    const unsubscribe = navigation?.addListener?.('focus', () => {
      if (userData) {
        loadEstatisticas();
      }
    });

    return unsubscribe;
  }, [navigation, userData]);

  const loadEstatisticas = async () => {
    try {
      const trilhasConcluidas = await getTrilhasConcluidas();
      const trilhasEmProgresso = await getMinhasTrilhas();
      const concluidasIds = trilhasConcluidas || [];
      const emProgressoIds = trilhasEmProgresso || [];
      const emProgressoCount = emProgressoIds.filter(id => !concluidasIds.includes(id)).length;

      setEstatisticas({
        trilhasConcluidas: concluidasIds.length,
        trilhasEmProgresso: emProgressoCount,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const loadUserData = async () => {
    try {
      const data = await getUserData();
      setUserDataState(data);
      if (data) {
        setNomeEditado(data.nome || '');
        setSobrenomeEditado(data.sobrenome || '');
        setEmailEditado(data.email || '');
        setTelefoneEditado(data.telefone || '');
        setSelectedAreasEditado(data.areasSelecionadas || []);
        setSelectedSkillsEditado(data.skillsSelecionadas || []);
      }

      // Carregar estatísticas
      const trilhasConcluidas = await getTrilhasConcluidas();
      const trilhasEmProgresso = await getMinhasTrilhas();
      const concluidasIds = trilhasConcluidas || [];
      const emProgressoIds = trilhasEmProgresso || [];
      const emProgressoCount = emProgressoIds.filter(id => !concluidasIds.includes(id)).length;

      setEstatisticas({
        trilhasConcluidas: concluidasIds.length,
        trilhasEmProgresso: emProgressoCount,
      });
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoadingInitial(false);
    }
  };

  if (loadingInitial) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Nenhum dado de usuário encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const {
    nome,
    sobrenome,
    email,
    telefone,
    areasSelecionadas = [],
    skillsSelecionadas = [],
  } = userData;

  // Para exibição (mostra dados editados se estiver editando, senão mostra dados originais)
  const areasExibidas = editando ? selectedAreasEditado : areasSelecionadas;
  const skillsExibidas = editando ? selectedSkillsEditado : skillsSelecionadas;

  const areasNomes = areasExibidas.map(areaId => {
    const area = AREAS.find(a => a.id === areaId);
    return area?.nome || areaId;
  });

  const skillsNomes = skillsExibidas.map(skillId => {
    const skill = SKILLS.find(s => s.id === skillId);
    return skill?.nome || skillId;
  });

  // Obter habilidades sugeridas baseado nas áreas selecionadas
  const suggestedSkills = editando ? getSuggestedSkills(selectedAreasEditado) : [];
  const availableSkills = editando
    ? SKILLS.filter(skill => !selectedSkillsEditado.includes(skill.id))
    : [];

  const toggleArea = areaId => {
    if (selectedAreasEditado.includes(areaId)) {
      setSelectedAreasEditado(selectedAreasEditado.filter(id => id !== areaId));
    } else {
      setSelectedAreasEditado([...selectedAreasEditado, areaId]);
    }
  };

  const toggleSkill = skillId => {
    if (selectedSkillsEditado.includes(skillId)) {
      setSelectedSkillsEditado(selectedSkillsEditado.filter(id => id !== skillId));
    } else {
      setSelectedSkillsEditado([...selectedSkillsEditado, skillId]);
    }
  };

  const adicionarHabilidade = skillId => {
    if (!selectedSkillsEditado.includes(skillId)) {
      setSelectedSkillsEditado([...selectedSkillsEditado, skillId]);
    }
    setModalSkillVisible(false);
  };

  const handleSalvar = async () => {
    setLoading(true);

    try {
      const updatedData = {
        nome: capitalizeWords(nomeEditado),
        sobrenome: capitalizeWords(sobrenomeEditado),
        email: emailEditado.trim().toLowerCase(),
        telefone: telefoneEditado,
        areasSelecionadas: selectedAreasEditado,
        skillsSelecionadas: selectedSkillsEditado,
      };

      await setUserData(updatedData);

      // Atualizar o estado local
      setUserDataState({ ...userData, ...updatedData });

      setEditando(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    // Restaurar valores originais
    setNomeEditado(userData.nome || '');
    setSobrenomeEditado(userData.sobrenome || '');
    setEmailEditado(userData.email || '');
    setTelefoneEditado(userData.telefone || '');
    setSelectedAreasEditado(userData.areasSelecionadas || []);
    setSelectedSkillsEditado(userData.skillsSelecionadas || []);
    setEditando(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Meu Perfil</Text>
            {!editando ? (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditando(true)}
                activeOpacity={0.7}
              >
                <MaterialIcons name="edit" size={20} color={colors.primary} />
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.editButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelar}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSalvar}
                  activeOpacity={0.7}
                  disabled={loading}
                >
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Estatísticas */}
          {!editando && (
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <MaterialIcons name="check-circle" size={24} color={colors.secondary} />
                <Text style={styles.statNumber}>{estatisticas.trilhasConcluidas}</Text>
                <Text style={styles.statLabel}>Concluídas</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialIcons name="book" size={24} color={colors.primary} />
                <Text style={styles.statNumber}>{estatisticas.trilhasEmProgresso}</Text>
                <Text style={styles.statLabel}>Em Progresso</Text>
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados Pessoais</Text>
            <View style={styles.card}>
              {editando ? (
                <>
                  <Input
                    label="Nome"
                    value={nomeEditado}
                    onChangeText={setNomeEditado}
                    placeholder="Seu primeiro nome"
                    autoCapitalize="words"
                  />
                  <Input
                    label="Sobrenome"
                    value={sobrenomeEditado}
                    onChangeText={setSobrenomeEditado}
                    placeholder="Seu sobrenome"
                    autoCapitalize="words"
                  />
                  <Input
                    label="E-mail"
                    value={emailEditado}
                    onChangeText={setEmailEditado}
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Input
                    label="Telefone"
                    value={telefoneEditado}
                    onChangeText={setTelefoneEditado}
                    placeholder="(XX) XXXXX-XXXX"
                    keyboardType="phone-pad"
                  />
                </>
              ) : (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nome:</Text>
                    <Text style={styles.infoValue}>
                      {capitalizeWords(nome)} {capitalizeWords(sobrenome)}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>E-mail:</Text>
                    <Text style={styles.infoValue}>{email || '-'}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Telefone:</Text>
                    <Text style={styles.infoValue}>{telefone || '-'}</Text>
                  </View>
                </>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Áreas de Interesse</Text>
            <View style={styles.card}>
              {editando ? (
                <>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setModalAreaVisible(true)}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        selectedAreasEditado.length === 0 && styles.placeholderText,
                      ]}
                    >
                      {selectedAreasEditado.length > 0
                        ? selectedAreasEditado
                            .map(id => AREAS.find(a => a.id === id)?.nome)
                            .join(', ')
                        : 'Selecione suas áreas'}
                    </Text>
                    <Text style={styles.selectArrow}>▼</Text>
                  </TouchableOpacity>
                  {selectedAreasEditado.length > 0 && (
                    <View style={styles.areaTagsContainer}>
                      {selectedAreasEditado.map(areaId => {
                        const area = AREAS.find(a => a.id === areaId);
                        return (
                          <View key={areaId} style={styles.areaTag}>
                            <Text style={styles.areaTagText}>{area?.nome}</Text>
                            <TouchableOpacity onPress={() => toggleArea(areaId)}>
                              <Text style={styles.removeText}>×</Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </>
              ) : (
                <>
                  {areasNomes.length > 0 ? (
                    <View style={styles.tagsContainer}>
                      {areasNomes.map((area, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{area}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.emptyText}>Nenhuma área selecionada</Text>
                  )}
                </>
              )}
            </View>
          </View>

          {editando && selectedAreasEditado.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Habilidades Sugeridas</Text>
              <View style={styles.skillChipsContainer}>
                {suggestedSkills.map(skill => {
                  const isSelected = selectedSkillsEditado.includes(skill.id);
                  return (
                    <TouchableOpacity
                      key={skill.id}
                      style={[styles.skillChip, isSelected && styles.skillChipSelected]}
                      onPress={() => toggleSkill(skill.id)}
                    >
                      <Text
                        style={[styles.skillChipText, isSelected && styles.skillChipTextSelected]}
                      >
                        {skill.nome} {isSelected ? '✓' : ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {editando && (
            <View style={styles.section}>
              <Text style={styles.label}>Adicionar Outra Habilidade</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setModalSkillVisible(true)}
              >
                <Text style={[styles.selectText, styles.placeholderText]}>
                  {availableSkills.length > 0
                    ? 'Selecione outras habilidades disponíveis'
                    : 'Todas as habilidades foram selecionadas'}
                </Text>
                <Text style={styles.selectArrow}>▼</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.card}>
              {skillsNomes.length > 0 ? (
                <View style={styles.tagsContainer}>
                  {skillsNomes.map((skillNome, index) => {
                    // Usa skillsExibidas para pegar o ID correto
                    const skillId = skillsExibidas[index];
                    return (
                      <View key={skillId || index} style={styles.tag}>
                        <Text style={styles.tagText}>{skillNome}</Text>
                        {editando && (
                          <TouchableOpacity onPress={() => toggleSkill(skillId)}>
                            <Text style={styles.removeTextInTag}>×</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Text style={styles.emptyText}>Nenhuma habilidade selecionada</Text>
              )}
            </View>
          </View>

          {onLogout && !editando && (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  Alert.alert('Sair', 'Deseja realmente sair?', [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Sair', style: 'destructive', onPress: onLogout },
                  ]);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Modal de Áreas */}
        <Modal
          visible={Boolean(modalAreaVisible)}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalAreaVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione suas áreas</Text>
              <FlatList
                data={AREAS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      selectedAreasEditado.includes(item.id) && styles.modalItemSelected,
                    ]}
                    onPress={() => toggleArea(item.id)}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        selectedAreasEditado.includes(item.id) && styles.modalItemTextSelected,
                      ]}
                    >
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Button title="Fechar" onPress={() => setModalAreaVisible(false)} />
            </View>
          </View>
        </Modal>

        {/* Modal de Habilidades */}
        <Modal
          visible={Boolean(modalSkillVisible)}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalSkillVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione uma habilidade</Text>
              {availableSkills.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Todas as habilidades foram selecionadas</Text>
                </View>
              ) : (
                <FlatList
                  data={availableSkills}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => adicionarHabilidade(item.id)}
                    >
                      <Text style={styles.modalItemText}>{item.nome}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
              <Button title="Fechar" onPress={() => setModalSkillVisible(false)} />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textLight,
    flex: 1,
    textAlign: 'right',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '600',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  selectButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  selectText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  placeholderText: {
    color: colors.textLight,
  },
  selectArrow: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
  },
  areaTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  areaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  areaTagText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  removeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  removeTextInTag: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  skillChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  skillChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  skillChipText: {
    color: colors.text,
    fontSize: 14,
  },
  skillChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalItemSelected: {
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
    marginBottom: 4,
  },
  modalItemText: {
    fontSize: 16,
    color: colors.text,
  },
  modalItemTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.error,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
});
