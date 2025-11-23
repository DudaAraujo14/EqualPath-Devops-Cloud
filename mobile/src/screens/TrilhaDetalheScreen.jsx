import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { getTrilhaById } from '../data/trilhas';
import {
  getUserData,
  adicionarTrilha,
  removerTrilha,
  estaSeguindoTrilha,
  concluirTrilha,
  desmarcarTrilhaConcluida,
  estaTrilhaConcluida,
} from '../data/userData';
import { SKILLS } from '../data/areasAndSkills';

export const TrilhaDetalheScreen = ({ route, navigation }) => {
  const { trilhaId } = route.params || {};
  const trilha = getTrilhaById(trilhaId);
  const [userData, setUserData] = useState(null);
  const [seguindoTrilha, setSeguindoTrilha] = useState(false);
  const [trilhaConcluida, setTrilhaConcluida] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [trilhaId]);

  const loadUserData = async () => {
    try {
      const data = await getUserData();
      setUserData(data);

      const seguindo = await estaSeguindoTrilha(trilhaId);
      setSeguindoTrilha(seguindo);

      const concluida = await estaTrilhaConcluida(trilhaId);
      setTrilhaConcluida(concluida);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const userSkills = userData?.skillsSelecionadas || [];

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!trilha) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Trilha não encontrada</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  let habilidadesDetalhadas = [];

  if (trilha.habilidadesNecessarias && trilha.habilidadesNecessarias.length > 0) {
    habilidadesDetalhadas = trilha.habilidadesNecessarias.map(habilidade => {
      const skill = SKILLS.find(
        s =>
          s.nome.toLowerCase() === habilidade.nome.toLowerCase() ||
          s.nome.toLowerCase().includes(habilidade.nome.toLowerCase()) ||
          habilidade.nome.toLowerCase().includes(s.nome.toLowerCase())
      );

      return {
        nome: habilidade.nome,
        nivel: habilidade.nivel || 'Requerido',
        skillId: skill?.id,
      };
    });
  } else if (trilha.skillsNecessarias && trilha.skillsNecessarias.length > 0) {
    habilidadesDetalhadas = trilha.skillsNecessarias.map(skillId => {
      const skill = SKILLS.find(s => s.id === skillId);
      return {
        nome: skill?.nome || skillId,
        nivel: 'Requerido',
        skillId: skillId,
      };
    });
  }

  const habilidadesDoUsuario = habilidadesDetalhadas.filter(habilidade => {
    if (habilidade.skillId && userSkills.includes(habilidade.skillId)) {
      return true;
    }
    if (!habilidade.skillId) {
      const skillId = SKILLS.find(
        s =>
          s.nome.toLowerCase() === habilidade.nome.toLowerCase() ||
          s.nome.toLowerCase().includes(habilidade.nome.toLowerCase())
      )?.id;
      return skillId && userSkills.includes(skillId);
    }
    return false;
  });

  const habilidadesFaltantes = habilidadesDetalhadas.filter(habilidade => {
    if (habilidade.skillId) {
      return !userSkills.includes(habilidade.skillId);
    }
    const skillId = SKILLS.find(
      s =>
        s.nome.toLowerCase() === habilidade.nome.toLowerCase() ||
        s.nome.toLowerCase().includes(habilidade.nome.toLowerCase())
    )?.id;
    return !skillId || !userSkills.includes(skillId);
  });

  const abrirLink = (cursoNome, url) => {
    const isGratuito = cursoNome.includes('[GRATUITO]');

    const getPlataforma = () => {
      if (url && url.trim() !== '' && url.startsWith('http')) {
        return url;
      } else if (cursoNome.includes('Alura') || cursoNome.includes('alura')) {
        return 'https://www.alura.com.br';
      } else if (cursoNome.includes('edX') || cursoNome.includes('edx')) {
        return 'https://www.edx.org';
      } else if (cursoNome.includes('freeCodeCamp') || cursoNome.includes('freecodecamp')) {
        return 'https://www.freecodecamp.org';
      } else if (cursoNome.includes('Trailhead') || cursoNome.includes('trailhead')) {
        return 'https://trailhead.salesforce.com';
      } else if (cursoNome.includes('FGV') || cursoNome.includes('fgv')) {
        return 'https://www5.fgv.br/fgvonline/Cursos/Gratuitos/';
      } else if (cursoNome.includes('Coursera') || cursoNome.includes('coursera')) {
        return 'https://www.coursera.org';
      } else if (cursoNome.includes('Udemy') || cursoNome.includes('udemy')) {
        return 'https://www.udemy.com';
      }
      return 'https://www.coursera.org';
    };

    if (isGratuito) {
      Linking.openURL(getPlataforma()).catch(err => {
        console.error('Erro ao abrir link:', err);
        Alert.alert('Erro', 'Não foi possível abrir o link. Verifique sua conexão com a internet.');
      });
    } else {
      Alert.alert(
        'Plataforma Paga',
        'Este curso está disponível em uma plataforma paga. Você será redirecionado para a página principal da plataforma onde poderá buscar o curso e realizar a inscrição.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Abrir plataforma',
            style: 'default',
            onPress: () => {
              Linking.openURL(getPlataforma()).catch(err => {
                console.error('Erro ao abrir link:', err);
                Alert.alert(
                  'Erro',
                  'Não foi possível abrir o link. Verifique sua conexão com a internet.'
                );
              });
            },
          },
        ]
      );
    }
  };

  const toggleSeguirTrilha = async () => {
    try {
      if (seguindoTrilha) {
        await removerTrilha(trilhaId);
        setSeguindoTrilha(false);
        // Se estava concluída, também remove da lista de concluídas
        if (trilhaConcluida) {
          await desmarcarTrilhaConcluida(trilhaId);
          setTrilhaConcluida(false);
        }
      } else {
        await adicionarTrilha(trilhaId);
        setSeguindoTrilha(true);
      }
    } catch (error) {
      console.error('Erro ao atualizar trilha:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a trilha. Tente novamente.');
    }
  };

  const toggleConcluirTrilha = async () => {
    try {
      if (!seguindoTrilha) {
        Alert.alert('Atenção', 'Você precisa seguir a trilha antes de marcá-la como concluída.');
        return;
      }

      if (trilhaConcluida) {
        await desmarcarTrilhaConcluida(trilhaId);
        setTrilhaConcluida(false);
        Alert.alert('Sucesso', 'Trilha desmarcada como concluída.');
      } else {
        await concluirTrilha(trilhaId);
        setTrilhaConcluida(true);
        Alert.alert('Parabéns! 🎉', 'Trilha marcada como concluída!');
      }
    } catch (error) {
      console.error('Erro ao atualizar status da trilha:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o status da trilha. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {trilha.tipo === 'introdutoria' ? 'Iniciante' : 'Avançado'}
              </Text>
            </View>
            {seguindoTrilha && (
              <TouchableOpacity
                style={[styles.completeButton, trilhaConcluida && styles.completeButtonActive]}
                onPress={toggleConcluirTrilha}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={trilhaConcluida ? 'check-circle' : 'check-circle-outline'}
                  size={20}
                  color={trilhaConcluida ? '#FFFFFF' : colors.secondary}
                />
                <Text
                  style={[
                    styles.completeButtonText,
                    trilhaConcluida && styles.completeButtonTextActive,
                  ]}
                >
                  {trilhaConcluida ? 'Concluída' : 'Concluir'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.followButton, seguindoTrilha && styles.followButtonActive]}
              onPress={toggleSeguirTrilha}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={seguindoTrilha ? 'bookmark' : 'bookmark-border'}
                size={20}
                color={seguindoTrilha ? '#FFFFFF' : colors.primary}
              />
              <Text
                style={[styles.followButtonText, seguindoTrilha && styles.followButtonTextActive]}
              >
                {seguindoTrilha ? 'Seguindo' : 'Seguir'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title}>{trilha.nome}</Text>
        <Text style={styles.descricao}>{trilha.descricao}</Text>

        {habilidadesDetalhadas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades Necessárias</Text>

            {habilidadesDoUsuario.length > 0 && (
              <View style={styles.subsection}>
                <View style={styles.subsectionHeader}>
                  <MaterialIcons name="check-circle" size={20} color={colors.secondary} />
                  <Text style={styles.subsectionTitle}>
                    Você já possui ({habilidadesDoUsuario.length})
                  </Text>
                </View>
                <View style={styles.skillsContainer}>
                  {habilidadesDoUsuario.map((habilidade, index) => (
                    <View key={index} style={[styles.skillTag, styles.skillTagSuccess]}>
                      <Text style={styles.skillTagText}>{habilidade.nome}</Text>
                      <Text style={styles.skillNivel}>{habilidade.nivel}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {habilidadesFaltantes.length > 0 && (
              <View style={styles.subsection}>
                <View style={styles.subsectionHeader}>
                  <MaterialIcons name="info" size={20} color={colors.error} />
                  <Text style={styles.subsectionTitle}>
                    Você precisa desenvolver ({habilidadesFaltantes.length})
                  </Text>
                </View>
                <View style={styles.skillsContainer}>
                  {habilidadesFaltantes.map((habilidade, index) => (
                    <View key={index} style={[styles.skillTag, styles.skillTagWarning]}>
                      <Text style={styles.skillTagText}>{habilidade.nome}</Text>
                      <Text style={styles.skillNivel}>{habilidade.nivel}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {trilha.cursosRecomendados && trilha.cursosRecomendados.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cursos Recomendados</Text>
            {trilha.cursosRecomendados.map((curso, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cursoCard}
                onPress={() => abrirLink(curso.nome, curso.url)}
                activeOpacity={0.7}
              >
                <View style={styles.cursoContent}>
                  <MaterialIcons name="school" size={24} color={colors.primary} />
                  <View style={styles.cursoInfo}>
                    <Text style={styles.cursoNome}>{curso.nome}</Text>
                    <Text style={styles.cursoLink}>Tocar para acessar →</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {habilidadesDetalhadas.length === 0 && (
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <MaterialIcons name="info-outline" size={24} color={colors.primary} />
              <Text style={styles.infoText}>
                Esta trilha é perfeita para iniciantes! Não requer habilidades prévias.
              </Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  descricao: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 24,
    marginBottom: 32,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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
  subsection: {
    marginBottom: 24,
  },
  subsectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillTagSuccess: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  skillTagWarning: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  skillTagText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  skillNivel: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  cursoCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cursoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cursoInfo: {
    flex: 1,
    marginLeft: 16,
  },
  cursoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  cursoLink: {
    fontSize: 14,
    color: colors.primary,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 12,
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  followButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
  followButtonTextActive: {
    color: '#FFFFFF',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  completeButtonActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
    marginLeft: 4,
  },
  completeButtonTextActive: {
    color: '#FFFFFF',
  },
});
