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
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { getMinhasTrilhas, getTrilhasConcluidas } from '../data/userData';
import { getTrilhaById } from '../data/trilhas';

export const MinhasTrilhasScreen = ({ navigation }) => {
  const [minhasTrilhas, setMinhasTrilhas] = useState([]);
  const [trilhasConcluidas, setTrilhasConcluidas] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('todas'); // 'todas', 'emProgresso', 'concluidas'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrilhas();

    // Recarregar quando a tela ganhar foco (quando voltar de outra tela)
    const unsubscribe = navigation.addListener('focus', () => {
      loadTrilhas();
    });

    return unsubscribe;
  }, [navigation]);

  const loadTrilhas = async () => {
    try {
      const trilhasIds = await getMinhasTrilhas();
      const trilhas = trilhasIds.map(id => getTrilhaById(id)).filter(Boolean);
      setMinhasTrilhas(trilhas);

      const concluidasIds = await getTrilhasConcluidas();
      const concluidas = concluidasIds.map(id => getTrilhaById(id)).filter(Boolean);
      setTrilhasConcluidas(concluidas);
    } catch (error) {
      console.error('Erro ao carregar trilhas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar trilhas baseado no filtro ativo
  const trilhasEmProgresso = minhasTrilhas.filter(
    trilha => !trilhasConcluidas.some(c => c.id === trilha.id)
  );

  const trilhasParaExibir =
    filtroAtivo === 'concluidas'
      ? trilhasConcluidas
      : filtroAtivo === 'emProgresso'
        ? trilhasEmProgresso
        : minhasTrilhas;

  const handleTrilhaPress = trilhaId => {
    if (navigation) {
      navigation.navigate('TrilhaDetalhe', { trilhaId });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Minhas Trilhas</Text>
          <Text style={styles.subtitle}>
            {minhasTrilhas.length > 0
              ? `${minhasTrilhas.length} trilha(s) que você está seguindo`
              : 'Trilhas que você está seguindo'}
          </Text>
        </View>

        {/* Filtros */}
        {minhasTrilhas.length > 0 && (
          <View style={styles.filtersContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filtroAtivo === 'todas' && styles.filterButtonActive]}
              onPress={() => setFiltroAtivo('todas')}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, filtroAtivo === 'todas' && styles.filterTextActive]}>
                Todas ({minhasTrilhas.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filtroAtivo === 'emProgresso' && styles.filterButtonActive,
              ]}
              onPress={() => setFiltroAtivo('emProgresso')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  filtroAtivo === 'emProgresso' && styles.filterTextActive,
                ]}
              >
                Em Progresso ({trilhasEmProgresso.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filtroAtivo === 'concluidas' && styles.filterButtonActive,
              ]}
              onPress={() => setFiltroAtivo('concluidas')}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.filterText, filtroAtivo === 'concluidas' && styles.filterTextActive]}
              >
                Concluídas ({trilhasConcluidas.length})
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {trilhasParaExibir.length > 0 ? (
          trilhasParaExibir.map(trilha => {
            const estaConcluida = trilhasConcluidas.some(c => c.id === trilha.id);
            return (
              <TouchableOpacity
                key={trilha.id}
                style={[styles.trilhaCard, estaConcluida && styles.trilhaCardConcluida]}
                onPress={() => handleTrilhaPress(trilha.id)}
                activeOpacity={0.7}
              >
                <View style={styles.trilhaHeader}>
                  <View style={styles.trilhaHeaderLeft}>
                    {estaConcluida && (
                      <MaterialIcons
                        name="check-circle"
                        size={20}
                        color={colors.secondary}
                        style={styles.checkIcon}
                      />
                    )}
                    <Text style={styles.trilhaNome}>{trilha.nome}</Text>
                  </View>
                  <View style={styles.badgesContainer}>
                    {estaConcluida && (
                      <View style={[styles.badge, styles.badgeConcluida]}>
                        <Text style={styles.badgeText}>Concluída</Text>
                      </View>
                    )}
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {trilha.tipo === 'introdutoria' ? 'Iniciante' : 'Avançado'}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.trilhaDescricao}>{trilha.descricao}</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.card}>
            <Text style={styles.emptyText}>
              {filtroAtivo === 'concluidas'
                ? 'Você ainda não concluiu nenhuma trilha'
                : filtroAtivo === 'emProgresso'
                  ? 'Você não tem trilhas em progresso no momento'
                  : 'Você ainda não começou nenhuma trilha'}
            </Text>
            <Text style={styles.emptySubtext}>
              {filtroAtivo === 'todas' && 'Acesse uma trilha recomendada e comece a segui-la'}
            </Text>
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
    marginBottom: 32,
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
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
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
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
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
  trilhaCardConcluida: {
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  trilhaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trilhaHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkIcon: {
    marginRight: 8,
  },
  trilhaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeConcluida: {
    backgroundColor: colors.secondary,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
