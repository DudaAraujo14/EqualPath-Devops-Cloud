export const AREAS = [
  { id: 'desenvolvimento', nome: 'Desenvolvimento' },
  { id: 'dados', nome: 'Dados / Analytics' },
  { id: 'design', nome: 'Design / UX' },
  { id: 'marketing', nome: 'Marketing' },
  { id: 'vendas', nome: 'Vendas / Comercial' },
  { id: 'suporte', nome: 'Suporte Técnico' },
  { id: 'gestao', nome: 'Gestão / Administração' },
  { id: 'rh', nome: 'Recursos Humanos' },
  { id: 'financas', nome: 'Finanças' },
  { id: 'operacoes', nome: 'Operações / Logística' },
  { id: 'educacao', nome: 'Educação' },
  { id: 'saude', nome: 'Saúde' },
  { id: 'engenharia', nome: 'Engenharia / Industrial' },
  { id: 'atendimento', nome: 'Atendimento ao Cliente' },
  { id: 'outros', nome: 'Outros' },
];

export const SKILLS = [
  // Desenvolvimento
  { id: 'logica_programacao', nome: 'Lógica de Programação', areas: ['desenvolvimento', 'dados'] },
  { id: 'git_github', nome: 'Git / GitHub', areas: ['desenvolvimento'] },
  { id: 'html_css', nome: 'HTML / CSS', areas: ['desenvolvimento', 'design'] },
  { id: 'javascript', nome: 'JavaScript', areas: ['desenvolvimento'] },
  { id: 'typescript', nome: 'TypeScript', areas: ['desenvolvimento'] },
  { id: 'python', nome: 'Python', areas: ['desenvolvimento', 'dados'] },
  { id: 'java', nome: 'Java', areas: ['desenvolvimento'] },
  { id: 'csharp', nome: 'C#', areas: ['desenvolvimento'] },
  { id: 'react', nome: 'React', areas: ['desenvolvimento'] },
  { id: 'node', nome: 'Node.js', areas: ['desenvolvimento'] },
  { id: 'api_rest', nome: 'APIs REST', areas: ['desenvolvimento'] },
  { id: 'testes_unitarios', nome: 'Testes Unitários', areas: ['desenvolvimento'] },
  { id: 'sql', nome: 'SQL', areas: ['desenvolvimento', 'dados', 'financas'] },
  { id: 'nosql', nome: 'NoSQL', areas: ['desenvolvimento'] },
  { id: 'docker', nome: 'Docker (Básico)', areas: ['desenvolvimento'] },
  { id: 'estruturas_dados', nome: 'Estruturas de Dados (Básico)', areas: ['desenvolvimento'] },

  // Dados / Analytics
  { id: 'excel', nome: 'Excel', areas: ['dados', 'gestao', 'financas'] },
  { id: 'power_bi', nome: 'Power BI', areas: ['dados', 'gestao'] },
  { id: 'estatistica_basica', nome: 'Estatística Básica', areas: ['dados'] },
  { id: 'visualizacao_dados', nome: 'Visualização de Dados', areas: ['dados', 'marketing'] },
  { id: 'etL_basico', nome: 'ETL Básico', areas: ['dados'] },
  { id: 'dashboards', nome: 'Criação de Dashboards', areas: ['dados'] },
  { id: 'limpeza_dados', nome: 'Limpeza de Dados', areas: ['dados'] },

  // Design / UX
  { id: 'figma', nome: 'Figma', areas: ['design'] },
  { id: 'ui_design', nome: 'UI Design', areas: ['design', 'desenvolvimento'] },
  { id: 'ux_research', nome: 'UX Research', areas: ['design'] },
  { id: 'wireframes', nome: 'Wireframes', areas: ['design'] },
  { id: 'prototipacao', nome: 'Prototipação', areas: ['design'] },
  { id: 'tipografia', nome: 'Tipografia', areas: ['design'] },
  { id: 'design_grafico', nome: 'Design Gráfico', areas: ['design', 'marketing'] },

  // Marketing
  { id: 'marketing_digital', nome: 'Marketing Digital', areas: ['marketing'] },
  { id: 'redes_sociais', nome: 'Redes Sociais', areas: ['marketing', 'atendimento'] },
  { id: 'copywriting', nome: 'Copywriting', areas: ['marketing', 'vendas'] },
  { id: 'seo', nome: 'SEO', areas: ['marketing'] },
  { id: 'email_marketing', nome: 'Email Marketing', areas: ['marketing'] },
  { id: 'analise_metricas', nome: 'Análise de Métricas', areas: ['marketing'] },
  { id: 'google_ads', nome: 'Google Ads (Básico)', areas: ['marketing'] },
  { id: 'meta_ads', nome: 'Meta Ads (Básico)', areas: ['marketing'] },

  // Vendas / Atendimento
  { id: 'negociacao', nome: 'Negociação', areas: ['vendas', 'gestao'] },
  { id: 'prospeccao', nome: 'Prospecção', areas: ['vendas'] },
  { id: 'comunicacao', nome: 'Comunicação', areas: ['vendas', 'atendimento', 'gestao', 'rh'] },
  { id: 'crm', nome: 'CRM', areas: ['vendas', 'marketing', 'atendimento'] },
  {
    id: 'atendimento_cliente',
    nome: 'Atendimento ao Cliente',
    areas: ['atendimento', 'vendas', 'suporte'],
  },
  { id: 'demonstracao_produto', nome: 'Demonstração de Produto', areas: ['vendas'] },

  // Suporte
  { id: 'suporte_tecnico', nome: 'Suporte Técnico', areas: ['suporte'] },
  { id: 'resolucao_problemas', nome: 'Resolução de Problemas', areas: ['suporte', 'atendimento'] },
  { id: 'sistemas_operacionais', nome: 'Sistemas Operacionais', areas: ['suporte'] },
  { id: 'documentacao', nome: 'Documentação Simples', areas: ['suporte'] },

  // Gestão / RH / Administração
  { id: 'lideranca', nome: 'Liderança', areas: ['gestao', 'rh'] },
  { id: 'gestao_projetos', nome: 'Gestão de Projetos', areas: ['gestao', 'engenharia'] },
  { id: 'planejamento', nome: 'Planejamento', areas: ['gestao'] },
  { id: 'organizacao', nome: 'Organização', areas: ['gestao', 'operacoes'] },
  { id: 'gestao_tempo', nome: 'Gestão de Tempo', areas: ['gestao'] },
  { id: 'trabalho_equipe', nome: 'Trabalho em Equipe', areas: ['gestao', 'rh'] },

  // Finanças
  { id: 'matematica_financeira', nome: 'Matemática Financeira', areas: ['financas'] },
  { id: 'fluxo_caixa', nome: 'Fluxo de Caixa', areas: ['financas'] },
  { id: 'relatorios_financeiros', nome: 'Relatórios Financeiros', areas: ['financas'] },

  // Operações
  { id: 'controle_estoque', nome: 'Controle de Estoque', areas: ['operacoes'] },
  { id: 'rotinas_administrativas', nome: 'Rotinas Administrativas', areas: ['operacoes'] },

  // Educação
  { id: 'didatica', nome: 'Didática', areas: ['educacao'] },
  { id: 'criacao_materiais', nome: 'Criação de Materiais', areas: ['educacao'] },

  // Saúde (versão enxuta)
  { id: 'atendimento_humanizado', nome: 'Atendimento Humanizado', areas: ['saude'] },

  // Engenharia
  { id: 'desenho_tecnico', nome: 'Desenho Técnico', areas: ['engenharia'] },
  { id: 'leitura_projetos', nome: 'Leitura de Projetos', areas: ['engenharia'] },
];

// Função para obter habilidades sugeridas baseado nas áreas selecionadas
export const getSuggestedSkills = selectedAreas => {
  if (!selectedAreas || selectedAreas.length === 0) {
    return SKILLS;
  }

  return SKILLS.filter(skill => {
    // Verifica se alguma área da skill está nas áreas selecionadas
    return skill.areas.some(area => selectedAreas.includes(area));
  });
};
