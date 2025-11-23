import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { AREAS, SKILLS } from '../data/areasAndSkills';
import { recomendarTrilhas } from '../data/trilhas';
import { getUserData } from '../data/userData';
import { capitalizeWords } from '../utils/stringUtils';

export const HomeScreen = ({ navigation, onNavigateToTrilha }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await getUserData();
      setUserData(data);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Nenhum dado de usuário encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { nome, sobrenome, areasSelecionadas = [], skillsSelecionadas = [] } = userData;

  const trilhasRecomendadas = recomendarTrilhas({
    areasSelecionadas: areasSelecionadas,
    skillsSelecionadas: skillsSelecionadas,
  });

  const areasNomes = areasSelecionadas.map(areaId => {
    const area = AREAS.find(a => a.id === areaId);
    return area?.nome || areaId;
  });

  const skillsNomes = skillsSelecionadas.map(skillId => {
    const skill = SKILLS.find(s => s.id === skillId);
    return skill?.nome || skillId;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {capitalizeWords(nome)}! 👋</Text>
          <Text style={styles.subtitle}>Bem-vindo ao seu caminho profissional</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Perfil</Text>
          <View style={styles.card}>
            <View style={styles.cardSection}>
              <Text style={styles.cardLabel}>Áreas de Interesse</Text>
              <View style={styles.tagsContainer}>
                {areasNomes.length > 0 ? (
                  areasNomes.map((area, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{area}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>Nenhuma área selecionada</Text>
                )}
              </View>
            </View>

            <View style={[styles.cardSection, styles.cardSectionMargin]}>
              <Text style={styles.cardLabel}>Habilidades</Text>
              <View style={styles.tagsContainer}>
                {skillsNomes.length > 0 ? (
                  skillsNomes.map((skill, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{skill}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>Nenhuma habilidade selecionada</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trilhas Recomendadas para Você</Text>
          {trilhasRecomendadas.length > 0 ? (
            trilhasRecomendadas.map(trilha => (
              <TouchableOpacity
                key={trilha.id}
                style={styles.trilhaCard}
                onPress={() => {
                  if (navigation) {
                    navigation.navigate('TrilhaDetalhe', { trilhaId: trilha.id });
                  } else if (onNavigateToTrilha) {
                    onNavigateToTrilha(trilha.id);
                  }
                }}
                activeOpacity={0.7}
              >
                <View style={styles.trilhaHeader}>
                  <Text style={styles.trilhaNome}>{trilha.nome}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {trilha.tipo === 'introdutoria' ? 'Iniciante' : 'Avançado'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.trilhaDescricao}>{trilha.descricao}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.card}>
              <Text style={styles.emptyText}>
                Selecione áreas de interesse para ver trilhas recomendadas
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 32,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
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
  cardSection: {
    marginBottom: 16,
  },
  cardSectionMargin: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
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
  },
  trilhaCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  trilhaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trilhaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  trilhaDescricao: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 48,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
