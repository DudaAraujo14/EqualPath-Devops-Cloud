import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { TRILHAS_INTRODUTORIAS, TRILHAS_AVANCADAS } from '../data/trilhas';
import { AREAS } from '../data/areasAndSkills';

export const TrilhasScreen = ({ navigation }) => {
  const [filtro, setFiltro] = useState('todas'); // 'todas', 'introdutoria', 'avancada'
  const [areaFiltro, setAreaFiltro] = useState('todas'); // 'todas' ou id da área

  // Combinar todas as trilhas
  const todasTrilhas = [...TRILHAS_INTRODUTORIAS, ...TRILHAS_AVANCADAS];

  // Filtrar trilhas
  let trilhasFiltradas = todasTrilhas;

  // Filtrar por tipo
  if (filtro === 'introdutoria') {
    trilhasFiltradas = trilhasFiltradas.filter(t => t.tipo === 'introdutoria');
  } else if (filtro === 'avancada') {
    trilhasFiltradas = trilhasFiltradas.filter(t => t.tipo === 'avancada');
  }

  // Filtrar por área
  if (areaFiltro !== 'todas') {
    trilhasFiltradas = trilhasFiltradas.filter(t => t.area === areaFiltro);
  }

  const handleTrilhaPress = trilhaId => {
    if (navigation) {
      navigation.navigate('TrilhaDetalhe', { trilhaId });
    }
  };

  const obterNomeArea = areaId => {
    const area = AREAS.find(a => a.id === areaId);
    return area?.nome || areaId;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Trilhas Disponíveis</Text>
          <Text style={styles.subtitle}>{trilhasFiltradas.length} trilha(s) encontrada(s)</Text>
        </View>

        {/* Filtros */}
        <View style={styles.filtrosContainer}>
          <View style={styles.filtroSection}>
            <Text style={styles.filtroLabel}>Tipo:</Text>
            <View style={styles.filtroButtons}>
              <TouchableOpacity
                style={[styles.filtroButton, filtro === 'todas' && styles.filtroButtonActive]}
                onPress={() => setFiltro('todas')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filtroButtonText,
                    filtro === 'todas' && styles.filtroButtonTextActive,
                  ]}
                >
                  Todas
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filtroButton,
                  filtro === 'introdutoria' && styles.filtroButtonActive,
                ]}
                onPress={() => setFiltro('introdutoria')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filtroButtonText,
                    filtro === 'introdutoria' && styles.filtroButtonTextActive,
                  ]}
                >
                  Iniciante
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filtroButton, filtro === 'avancada' && styles.filtroButtonActive]}
                onPress={() => setFiltro('avancada')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filtroButtonText,
                    filtro === 'avancada' && styles.filtroButtonTextActive,
                  ]}
                >
                  Avançado
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filtroSection}>
            <Text style={styles.filtroLabel}>Área:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.areaFiltroScroll}
            >
              <TouchableOpacity
                style={[
                  styles.areaFiltroButton,
                  areaFiltro === 'todas' && styles.areaFiltroButtonActive,
                ]}
                onPress={() => setAreaFiltro('todas')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.areaFiltroButtonText,
                    areaFiltro === 'todas' && styles.areaFiltroButtonTextActive,
                  ]}
                >
                  Todas
                </Text>
              </TouchableOpacity>
              {AREAS.map(area => (
                <TouchableOpacity
                  key={area.id}
                  style={[
                    styles.areaFiltroButton,
                    areaFiltro === area.id && styles.areaFiltroButtonActive,
                  ]}
                  onPress={() => setAreaFiltro(area.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.areaFiltroButtonText,
                      areaFiltro === area.id && styles.areaFiltroButtonTextActive,
                    ]}
                  >
                    {area.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Lista de Trilhas */}
        {trilhasFiltradas.length > 0 ? (
          trilhasFiltradas.map(trilha => (
            <TouchableOpacity
              key={trilha.id}
              style={styles.trilhaCard}
              onPress={() => handleTrilhaPress(trilha.id)}
              activeOpacity={0.7}
            >
              <View style={styles.trilhaHeader}>
                <View style={styles.trilhaInfo}>
                  <Text style={styles.trilhaNome}>{trilha.nome}</Text>
                  <Text style={styles.trilhaArea}>{obterNomeArea(trilha.area)}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {trilha.tipo === 'introdutoria' ? 'Iniciante' : 'Avançado'}
                  </Text>
                </View>
              </View>
              <Text style={styles.trilhaDescricao}>{trilha.descricao}</Text>
              <View style={styles.trilhaFooter}>
                <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
                <Text style={styles.verMaisText}>Ver detalhes</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.card}>
            <MaterialIcons name="search-off" size={48} color={colors.textLight} />
            <Text style={styles.emptyText}>Nenhuma trilha encontrada</Text>
            <Text style={styles.emptySubtext}>Tente ajustar os filtros</Text>
          </View>
        )}
      </ScrollView>
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
  header: {
    marginBottom: 24,
    paddingTop: 8,
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
  },
  filtrosContainer: {
    marginBottom: 24,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filtroSection: {
    marginBottom: 16,
  },
  filtroLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  filtroButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filtroButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  filtroButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filtroButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filtroButtonTextActive: {
    color: '#FFFFFF',
  },
  areaFiltroScroll: {
    flexGrow: 0,
  },
  areaFiltroButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    marginRight: 8,
  },
  areaFiltroButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  areaFiltroButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  areaFiltroButtonTextActive: {
    color: '#FFFFFF',
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  trilhaInfo: {
    flex: 1,
    marginRight: 12,
  },
  trilhaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  trilhaArea: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
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
    marginBottom: 12,
  },
  trilhaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  verMaisText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 40,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
