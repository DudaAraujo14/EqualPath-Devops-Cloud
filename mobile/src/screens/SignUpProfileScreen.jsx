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
  Modal,
  FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import { AREAS, SKILLS, getSuggestedSkills } from '../data/areasAndSkills';
import { saveUser, loginUser } from '../services/authService';

export const SignUpProfileScreen = ({ userData, onNavigateToLogin, onComplete }) => {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [modalAreaVisible, setModalAreaVisible] = useState(false);
  const [modalSkillVisible, setModalSkillVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Obter habilidades sugeridas baseado nas áreas selecionadas
  const suggestedSkills = getSuggestedSkills(selectedAreas);

  // Obter todas as habilidades que ainda não foram selecionadas
  const availableSkills = SKILLS.filter(skill => !selectedSkills.includes(skill.id));

  const toggleArea = areaId => {
    if (selectedAreas.includes(areaId)) {
      setSelectedAreas(selectedAreas.filter(id => id !== areaId));
    } else {
      setSelectedAreas([...selectedAreas, areaId]);
    }
  };

  const toggleSkill = skillId => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const adicionarHabilidade = skillId => {
    if (!selectedSkills.includes(skillId)) {
      setSelectedSkills([...selectedSkills, skillId]);
    }
    setModalSkillVisible(false);
  };

  const handleCreateAccount = async () => {
    if (selectedAreas.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione pelo menos uma área de interesse');
      return;
    }

    if (!userData || !userData.email || !userData.senha) {
      Alert.alert('Erro', 'Dados do usuário incompletos. Por favor, refaça o cadastro.');
      return;
    }

    setLoading(true);

    try {
      // Salvar novo usuário no AsyncStorage
      await saveUser({
        nome: userData.nome,
        sobrenome: userData.sobrenome,
        email: userData.email.trim().toLowerCase(),
        senha: userData.senha,
        telefone: userData.telefone || '',
        areasSelecionadas: selectedAreas,
        skillsSelecionadas: selectedSkills,
      });

      // Fazer login automático após cadastro
      await loginUser(userData.email.trim().toLowerCase(), userData.senha);

      setLoading(false);
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            if (onComplete) {
              onComplete();
            } else {
              onNavigateToLogin();
            }
          },
        },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Erro ao criar conta',
        error.message || 'Não foi possível criar a conta. Tente novamente.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Perfil Profissional</Text>
          <Text style={styles.subtitle}>Complete seu perfil</Text>
        </View>

        <View style={styles.form}>
          {/* Seleção de Áreas */}
          <View style={styles.section}>
            <Text style={styles.label}>Áreas de Interesse *</Text>
            <TouchableOpacity style={styles.selectButton} onPress={() => setModalAreaVisible(true)}>
              <Text
                style={[styles.selectText, selectedAreas.length === 0 && styles.placeholderText]}
              >
                {selectedAreas.length === 0
                  ? 'Selecione uma ou mais áreas'
                  : `${selectedAreas.length} área(s) selecionada(s)`}
              </Text>
              <Text style={styles.selectArrow}>▼</Text>
            </TouchableOpacity>

            {/* Mostrar áreas selecionadas */}
            {selectedAreas.length > 0 && (
              <View style={styles.selectedItemsContainer}>
                {selectedAreas.map(areaId => {
                  const area = AREAS.find(a => a.id === areaId);
                  return (
                    <View key={areaId} style={styles.selectedTag}>
                      <Text style={styles.selectedTagText}>{area?.nome}</Text>
                      <TouchableOpacity onPress={() => toggleArea(areaId)}>
                        <Text style={styles.removeText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          <Modal
            visible={Boolean(modalAreaVisible)}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalAreaVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione as áreas de interesse</Text>
                <FlatList
                  data={AREAS}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => {
                    const isSelected = selectedAreas.includes(item.id);
                    return (
                      <TouchableOpacity
                        style={[styles.modalItem, isSelected && styles.modalItemSelected]}
                        onPress={() => toggleArea(item.id)}
                      >
                        <Text
                          style={[styles.modalItemText, isSelected && styles.modalItemTextSelected]}
                        >
                          {isSelected ? '✓ ' : ''}
                          {item.nome}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
                <Button
                  title="Confirmar"
                  onPress={() => setModalAreaVisible(false)}
                  disabled={false}
                />
              </View>
            </View>
          </Modal>

          {/* Seleção de Habilidades */}
          {selectedAreas.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Habilidades Sugeridas</Text>
              <Text style={styles.hint}>Baseado nas áreas selecionadas</Text>

              <View style={styles.skillsContainer}>
                {suggestedSkills.map(skill => {
                  const isSelected = selectedSkills.includes(skill.id);
                  return (
                    <TouchableOpacity
                      key={skill.id}
                      style={[styles.skillChip, isSelected && styles.skillChipSelected]}
                      onPress={() => toggleSkill(skill.id)}
                    >
                      <Text
                        style={[styles.skillChipText, isSelected && styles.skillChipTextSelected]}
                      >
                        {isSelected ? '✓ ' : ''}
                        {skill.nome}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Adicionar Outras Habilidades */}
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

            {availableSkills.length === 0 && selectedSkills.length > 0 && (
              <Text style={styles.hint}>Todas as habilidades foram selecionadas</Text>
            )}
          </View>

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
                <Button
                  title="Fechar"
                  onPress={() => setModalSkillVisible(false)}
                  disabled={false}
                />
              </View>
            </View>
          </Modal>

          {/* Habilidades Selecionadas */}
          {selectedSkills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Habilidades Selecionadas</Text>
              <View style={styles.selectedSkillsContainer}>
                {selectedSkills.map(skillId => {
                  const skill = SKILLS.find(s => s.id === skillId);
                  return (
                    <View key={skillId} style={styles.selectedSkillTag}>
                      <Text style={styles.selectedSkillText}>{skill?.nome}</Text>
                      <TouchableOpacity onPress={() => toggleSkill(skillId)}>
                        <Text style={styles.removeText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Resumo */}
          {selectedSkills.length > 0 && (
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>
                Total: {selectedSkills.length} habilidade(s) selecionada(s)
              </Text>
            </View>
          )}

          <Button
            title="Criar conta"
            onPress={handleCreateAccount}
            loading={loading}
            disabled={loading}
          />
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
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 12,
    fontStyle: 'italic',
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
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTagText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    backgroundColor: colors.primary,
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
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  skillChipText: {
    fontSize: 14,
    color: colors.text,
  },
  skillChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectedSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  selectedSkillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSkillText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 8,
  },
  removeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  summarySection: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
