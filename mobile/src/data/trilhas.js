// TRILHAS_INTRODUTORIAS → trilhas que qualquer pessoa pode fazer mesmo sem skills
export const TRILHAS_INTRODUTORIAS = [
  {
    id: 'fundamentos_tech',
    nome: 'Fundamentos de Tecnologia',
    area: 'desenvolvimento',
    descricao:
      'Aprenda os conceitos básicos de tecnologia e programação, perfeito para iniciantes que querem começar do zero.',
    habilidadesNecessarias: [],
    cursosRecomendados: [
      {
        nome: 'Lógica de Programação: comece em lógica com o jogo Pong e JavaScript - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: "CS50's Introduction to Computer Science - Harvard (edX) [GRATUITO]",
        url: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
      },
      {
        nome: 'JavaScript Básico - freeCodeCamp [GRATUITO]',
        url: 'https://www.freecodecamp.org/portuguese/learn/javascript-algorithms-and-data-structures/',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'fundamentos_dados',
    nome: 'Fundamentos de Dados',
    area: 'dados',
    descricao:
      'Introdução à área de dados e analytics. Ideal para quem quer entender como trabalhar com informações.',
    habilidadesNecessarias: [],
    cursosRecomendados: [
      { nome: 'Data Science: primeiros passos - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Introduction to Data Science in Python - Coursera (University of Michigan)',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'introducao_marketing',
    nome: 'Introdução ao Marketing Digital',
    area: 'marketing',
    descricao: 'Conceitos básicos de marketing digital e como funciona o marketing online.',
    habilidadesNecessarias: [],
    cursosRecomendados: [
      {
        nome: 'Marketing Digital: fundamentos e principais conceitos - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Google Digital Marketing & E-commerce Certificate - Coursera [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'atendimento_basico',
    nome: 'Atendimento ao Cliente (Iniciante)',
    area: 'atendimento',
    descricao:
      'Aprenda os fundamentos de atendimento ao cliente e como se comunicar de forma eficaz.',
    habilidadesNecessarias: [],
    cursosRecomendados: [
      {
        nome: 'Atendimento ao Cliente: técnicas e boas práticas - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Customer Service Fundamentals - Coursera (CVS Health)',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'softskills',
    nome: 'Soft Skills Essenciais',
    area: 'outros',
    descricao:
      'Desenvolva habilidades interpessoais essenciais para qualquer carreira: comunicação, trabalho em equipe e liderança.',
    habilidadesNecessarias: [],
    cursosRecomendados: [
      {
        nome: 'Soft Skills: desenvolva suas habilidades comportamentais - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'People and Soft Skills for Professional and Personal Success - IBM (Coursera) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      {
        nome: 'Inteligência Emocional no Trabalho - FGV Online [GRATUITO]',
        url: 'https://www.fgv.br',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'administracao_iniciante',
    nome: 'Administração para Iniciantes',
    area: 'gestao',
    descricao: 'Fundamentos de administração e gestão empresarial para quem está começando.',
    habilidadesNecessarias: [],
    cursosRecomendados: [
      { nome: 'Gestão Ágil: liderando equipes ágeis - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Wharton Business Foundations Specialization - Coursera (University of Pennsylvania)',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  // Trilhas introdutórias específicas por skill
  {
    id: 'intro_python',
    nome: 'Introdução ao Python',
    area: 'desenvolvimento',
    descricao: 'Aprenda Python do zero! Perfeito para iniciantes que querem começar a programar.',
    habilidadesNecessarias: [],
    ensinaSkill: 'python',
    cursosRecomendados: [
      {
        nome: 'Python para Data Science: primeiros passos - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Python for Everybody Specialization - Coursera (University of Michigan) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_sql',
    nome: 'Introdução ao SQL',
    area: 'dados',
    descricao: 'Aprenda SQL do zero! Fundamentos de bancos de dados e consultas.',
    habilidadesNecessarias: [],
    ensinaSkill: 'sql',
    cursosRecomendados: [
      { nome: 'SQL com MySQL: manipule e consulte dados - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Databases and SQL for Data Science with Python - Coursera (IBM) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_html_css',
    nome: 'Introdução ao HTML/CSS',
    area: 'desenvolvimento',
    descricao: 'Aprenda HTML e CSS do zero! Crie suas primeiras páginas web.',
    habilidadesNecessarias: [],
    ensinaSkill: 'html_css',
    cursosRecomendados: [
      {
        nome: 'HTML5 e CSS3 parte 1: crie uma página da Web - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'HTML, CSS, and Javascript for Web Developers - Coursera (Johns Hopkins) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_javascript',
    nome: 'Introdução ao JavaScript',
    area: 'desenvolvimento',
    descricao: 'Aprenda JavaScript do zero! Dê vida às suas páginas web.',
    habilidadesNecessarias: [],
    ensinaSkill: 'javascript',
    cursosRecomendados: [
      { nome: 'JavaScript: explorando a linguagem - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Programming with JavaScript - Meta (Coursera) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_excel',
    nome: 'Introdução ao Excel',
    area: 'dados',
    descricao: 'Aprenda Excel do zero! Fundamentos de planilhas e análise de dados.',
    habilidadesNecessarias: [],
    ensinaSkill: 'excel',
    cursosRecomendados: [
      { nome: 'Excel: domine o editor de planilhas - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Excel Skills for Business Specialization - Coursera (Macquarie University)',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_figma',
    nome: 'Introdução ao Figma',
    area: 'design',
    descricao: 'Aprenda Figma do zero! Crie seus primeiros designs profissionais.',
    habilidadesNecessarias: [],
    ensinaSkill: 'figma',
    cursosRecomendados: [
      { nome: 'Figma: design visual de um site mobile - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Build Wireframes and Low-Fidelity Prototypes - Google (Coursera) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_marketing_digital',
    nome: 'Introdução ao Marketing Digital',
    area: 'marketing',
    descricao: 'Aprenda os fundamentos de marketing digital e redes sociais.',
    habilidadesNecessarias: [],
    ensinaSkill: 'marketing_digital',
    cursosRecomendados: [
      {
        nome: 'Marketing Digital: estratégias e ferramentas - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Google Digital Marketing & E-commerce - Coursera [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_crm',
    nome: 'Introdução ao CRM',
    area: 'vendas',
    descricao: 'Aprenda a usar CRM e gerenciar relacionamento com clientes.',
    habilidadesNecessarias: [],
    ensinaSkill: 'crm',
    cursosRecomendados: [
      {
        nome: 'CRM: estratégias de relacionamento com o cliente - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Salesforce Sales Operations - Salesforce Trailhead [GRATUITO]',
        url: 'https://trailhead.salesforce.com',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_react',
    nome: 'Introdução ao React',
    area: 'desenvolvimento',
    descricao: 'Aprenda React do zero! Crie interfaces modernas e interativas.',
    habilidadesNecessarias: [],
    ensinaSkill: 'react',
    cursosRecomendados: [
      { nome: 'React: desenvolvendo com JavaScript - Alura', url: 'https://www.alura.com.br' },
      { nome: 'React Basics - Meta (Coursera) [GRATUITO]', url: 'https://www.coursera.org' },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_typescript',
    nome: 'Introdução ao TypeScript',
    area: 'desenvolvimento',
    descricao: 'Aprenda TypeScript e fortaleça seu JavaScript com tipagem estática.',
    habilidadesNecessarias: [],
    ensinaSkill: 'typescript',
    cursosRecomendados: [
      {
        nome: 'TypeScript parte 1: evoluindo seu JavaScript - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Programming TypeScript - freeCodeCamp [GRATUITO]',
        url: 'https://www.freecodecamp.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_java',
    nome: 'Introdução ao Java',
    area: 'desenvolvimento',
    descricao: 'Aprenda Java do zero! Uma das linguagens mais usadas no mercado.',
    habilidadesNecessarias: [],
    ensinaSkill: 'java',
    cursosRecomendados: [
      {
        nome: 'Java: trabalhando com listas e coleções de dados - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Java Programming and Software Engineering Fundamentals - Duke (Coursera) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_node',
    nome: 'Introdução ao Node.js',
    area: 'desenvolvimento',
    descricao: 'Aprenda Node.js e desenvolva aplicações backend com JavaScript.',
    habilidadesNecessarias: [],
    ensinaSkill: 'node',
    cursosRecomendados: [
      { nome: 'Node.js: criando sua primeira biblioteca - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Server-side Development with NodeJS, Express and MongoDB - Coursera (Hong Kong University) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_ui_design',
    nome: 'Introdução ao UI Design',
    area: 'design',
    descricao: 'Aprenda os fundamentos de design de interface e crie telas profissionais.',
    habilidadesNecessarias: [],
    ensinaSkill: 'ui_design',
    cursosRecomendados: [
      {
        nome: 'UI Design: construindo interfaces do zero - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'UI / UX Design Specialization - CalArts (Coursera) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_seo',
    nome: 'Introdução ao SEO',
    area: 'marketing',
    descricao: 'Aprenda SEO e faça seu conteúdo aparecer nos primeiros resultados do Google.',
    habilidadesNecessarias: [],
    ensinaSkill: 'seo',
    cursosRecomendados: [
      {
        nome: 'SEO: otimização de sites e técnicas de posicionamento - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Search Engine Optimization (SEO) Specialization - UC Davis (Coursera)',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
  {
    id: 'intro_gestao_projetos',
    nome: 'Introdução à Gestão de Projetos',
    area: 'gestao',
    descricao: 'Aprenda os fundamentos de gestão de projetos e metodologias ágeis.',
    habilidadesNecessarias: [],
    ensinaSkill: 'gestao_projetos',
    cursosRecomendados: [
      { nome: 'Gestão de Projetos: fundamentos - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Google Project Management Certificate - Coursera [GRATUITO]',
        url: 'https://www.coursera.org',
      },
    ],
    tipo: 'introdutoria',
  },
];

// TRILHAS_AVANCADAS → trilhas "normais", usadas quando o usuário tem skills
export const TRILHAS_AVANCADAS = [
  {
    id: 'dev_front',
    nome: 'Trilha Front-end',
    area: 'desenvolvimento',
    skillsNecessarias: ['html_css', 'javascript'],
    descricao:
      'Especialize-se em desenvolvimento front-end criando interfaces modernas e responsivas.',
    habilidadesNecessarias: [
      { nome: 'HTML / CSS', nivel: 'Intermediário' },
      { nome: 'JavaScript', nivel: 'Intermediário' },
      { nome: 'React', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      {
        nome: 'Formação A partir do zero: iniciante em programação - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'HTML, CSS, and Javascript for Web Developers - Coursera (Johns Hopkins) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      { nome: 'React: curso completo do básico ao avançado - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'dev_python',
    nome: 'Trilha Python',
    area: 'desenvolvimento',
    skillsNecessarias: ['python'],
    descricao: 'Desenvolva aplicações em Python e se torne um desenvolvedor Python completo.',
    habilidadesNecessarias: [
      { nome: 'Python', nivel: 'Básico' },
      { nome: 'Lógica de Programação', nivel: 'Intermediário' },
      { nome: 'APIs REST', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      {
        nome: 'Python para Data Science: linguagem e Numpy - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Python for Everybody Specialization - Coursera (University of Michigan) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      { nome: 'Complete Python Bootcamp From Zero to Hero - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'dados_powerbi',
    nome: 'Trilha Power BI',
    area: 'dados',
    skillsNecessarias: ['excel'],
    descricao: 'Crie dashboards e visualizações de dados profissionais com Power BI.',
    habilidadesNecessarias: [
      { nome: 'Excel', nivel: 'Intermediário' },
      { nome: 'Power BI', nivel: 'Básico' },
      { nome: 'Visualização de Dados', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      { nome: 'Power BI Desktop: construindo dashboards - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Introduction to Data Analysis using Excel - Coursera (Rice University) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      {
        nome: 'Microsoft Power BI Desktop for Business Intelligence - Udemy',
        url: 'https://www.udemy.com',
      },
    ],
    tipo: 'avancada',
  },
  {
    id: 'design_ui',
    nome: 'Trilha UI/UX',
    area: 'design',
    skillsNecessarias: ['figma'],
    descricao: 'Torne-se um especialista em design de interfaces e experiência do usuário.',
    habilidadesNecessarias: [
      { nome: 'Figma', nivel: 'Intermediário' },
      { nome: 'UI Design', nivel: 'Intermediário' },
      { nome: 'UX Research', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      {
        nome: 'UX Design: entenda a experiência de usuário - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Google UX Design Certificate - Coursera [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      { nome: 'UI/UX Design Bootcamp - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'marketing_conteudo',
    nome: 'Marketing de Conteúdo',
    area: 'marketing',
    skillsNecessarias: ['redes_sociais', 'copywriting'],
    descricao:
      'Aprenda a criar e gerenciar conteúdo para redes sociais e estratégias de marketing.',
    habilidadesNecessarias: [
      { nome: 'Redes Sociais', nivel: 'Intermediário' },
      { nome: 'Copywriting', nivel: 'Intermediário' },
      { nome: 'Marketing Digital', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      {
        nome: 'Marketing de Conteúdo: criação e distribuição - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Content Strategy for Professionals - Coursera (Northwestern University)',
        url: 'https://www.coursera.org',
      },
      {
        nome: 'Content Marketing Masterclass: Create Content That Sells - Udemy',
        url: 'https://www.udemy.com',
      },
    ],
    tipo: 'avancada',
  },
  {
    id: 'vendas_inside',
    nome: 'Inside Sales',
    area: 'vendas',
    skillsNecessarias: ['crm', 'comunicacao'],
    descricao: 'Especialize-se em vendas internas e relacionamento com clientes.',
    habilidadesNecessarias: [
      { nome: 'CRM', nivel: 'Intermediário' },
      { nome: 'Comunicação', nivel: 'Intermediário' },
      { nome: 'Negociação', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      {
        nome: 'Vendas: técnicas e estratégias de negociação - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'The Art of Sales: Mastering the Selling Process - Coursera (Northwestern University)',
        url: 'https://www.coursera.org',
      },
      { nome: 'Complete Sales Skills Masterclass - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'dados_python',
    nome: 'Ciência de Dados com Python',
    area: 'dados',
    skillsNecessarias: ['python', 'sql'],
    descricao: 'Aplique Python para análise de dados e ciência de dados avançada.',
    habilidadesNecessarias: [
      { nome: 'Python', nivel: 'Intermediário' },
      { nome: 'SQL', nivel: 'Intermediário' },
      { nome: 'Estatística Básica', nivel: 'Intermediário' },
    ],
    cursosRecomendados: [
      {
        nome: 'Python para Data Science: primeiros passos com dados - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Applied Data Science with Python Specialization - Coursera (University of Michigan) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      {
        nome: 'Python for Data Science and Machine Learning Bootcamp - Udemy',
        url: 'https://www.udemy.com',
      },
    ],
    tipo: 'avancada',
  },
  {
    id: 'suporte_tecnico',
    nome: 'Suporte Técnico',
    area: 'suporte',
    skillsNecessarias: ['resolucao_problemas'],
    descricao: 'Torne-se especialista em suporte técnico e resolução de problemas.',
    habilidadesNecessarias: [
      { nome: 'Resolução de Problemas', nivel: 'Intermediário' },
      { nome: 'Comunicação', nivel: 'Intermediário' },
      { nome: 'Sistemas Operacionais', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      {
        nome: 'Suporte Técnico: fundamentos e boas práticas - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Google IT Support Professional Certificate - Coursera [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      { nome: 'IT Support Technical Skills Helpdesk - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'dev_backend',
    nome: 'Trilha Back-end',
    area: 'desenvolvimento',
    skillsNecessarias: ['python', 'sql'],
    descricao: 'Especialize-se em desenvolvimento back-end criando APIs e sistemas robustos.',
    habilidadesNecessarias: [
      { nome: 'Python', nivel: 'Intermediário' },
      { nome: 'SQL', nivel: 'Intermediário' },
      { nome: 'APIs REST', nivel: 'Intermediário' },
    ],
    cursosRecomendados: [
      { nome: 'Python para backend: Flask e Django - Alura', url: 'https://www.alura.com.br' },
      { nome: 'APIs REST e RESTful: do zero à nuvem - Alura', url: 'https://www.alura.com.br' },
      { nome: 'REST API with Flask and Python - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'dev_fullstack',
    nome: 'Trilha Full Stack',
    area: 'desenvolvimento',
    skillsNecessarias: ['html_css', 'javascript', 'node'],
    descricao: 'Domine desenvolvimento completo: do front-end ao back-end com JavaScript.',
    habilidadesNecessarias: [
      { nome: 'HTML / CSS', nivel: 'Intermediário' },
      { nome: 'JavaScript', nivel: 'Intermediário' },
      { nome: 'Node.js', nivel: 'Intermediário' },
      { nome: 'React', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      { nome: 'Formação Full Stack JavaScript - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Full Stack Web Development with React Specialization - Coursera (Hong Kong University) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      {
        nome: 'The Complete Web Developer in 2023: Zero to Mastery - Udemy',
        url: 'https://www.udemy.com',
      },
    ],
    tipo: 'avancada',
  },
  {
    id: 'dados_analytics',
    nome: 'Analytics e Business Intelligence',
    area: 'dados',
    skillsNecessarias: ['excel', 'power_bi'],
    descricao: 'Transforme dados em insights estratégicos para tomada de decisões empresariais.',
    habilidadesNecessarias: [
      { nome: 'Excel', nivel: 'Intermediário' },
      { nome: 'Power BI', nivel: 'Intermediário' },
      { nome: 'Visualização de Dados', nivel: 'Intermediário' },
    ],
    cursosRecomendados: [
      {
        nome: 'Power BI: análise de dados para Business Intelligence - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Business Analytics Specialization - Wharton (Coursera)',
        url: 'https://www.coursera.org',
      },
      {
        nome: 'Microsoft Power BI Desktop for Business Intelligence - Udemy',
        url: 'https://www.udemy.com',
      },
    ],
    tipo: 'avancada',
  },
  {
    id: 'design_produto',
    nome: 'Design de Produto Digital',
    area: 'design',
    skillsNecessarias: ['figma', 'ui_design', 'ux_research'],
    descricao: 'Crie produtos digitais que encantam usuários com design centrado no ser humano.',
    habilidadesNecessarias: [
      { nome: 'Figma', nivel: 'Intermediário' },
      { nome: 'UI Design', nivel: 'Intermediário' },
      { nome: 'UX Research', nivel: 'Intermediário' },
    ],
    cursosRecomendados: [
      {
        nome: 'UX Design: entenda a experiência de usuário - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Google UX Design Certificate - Coursera [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      { nome: 'Complete Web & Mobile Designer in 2023 - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'marketing_performance',
    nome: 'Marketing de Performance',
    area: 'marketing',
    skillsNecessarias: ['marketing_digital', 'google_ads', 'analise_metricas'],
    descricao: 'Domine campanhas digitais com foco em resultados e ROI mensurável.',
    habilidadesNecessarias: [
      { nome: 'Marketing Digital', nivel: 'Intermediário' },
      { nome: 'Google Ads', nivel: 'Básico' },
      { nome: 'Análise de Métricas', nivel: 'Intermediário' },
    ],
    cursosRecomendados: [
      { nome: 'Google Ads: estratégias e campanhas - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Google Digital Marketing & E-commerce Certificate - Coursera [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      { nome: 'The Complete Digital Marketing Course - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'vendas_field',
    nome: 'Vendas Externas (Field Sales)',
    area: 'vendas',
    skillsNecessarias: ['negociacao', 'comunicacao', 'prospeccao'],
    descricao: 'Especialize-se em vendas B2B e relacionamento comercial de alto valor.',
    habilidadesNecessarias: [
      { nome: 'Negociação', nivel: 'Intermediário' },
      { nome: 'Comunicação', nivel: 'Intermediário' },
      { nome: 'Prospecção', nivel: 'Intermediário' },
    ],
    cursosRecomendados: [
      {
        nome: 'Vendas: técnicas e estratégias de negociação - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'The Art of Sales: Mastering the Selling Process - Coursera (Northwestern University)',
        url: 'https://www.coursera.org',
      },
      { nome: 'B2B Sales Mastery - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'gestao_lideranca',
    nome: 'Liderança e Gestão de Equipes',
    area: 'gestao',
    skillsNecessarias: ['lideranca', 'comunicacao', 'gestao_projetos'],
    descricao:
      'Desenvolva habilidades de liderança e aprenda a gerenciar equipes de alto desempenho.',
    habilidadesNecessarias: [
      { nome: 'Liderança', nivel: 'Intermediário' },
      { nome: 'Comunicação', nivel: 'Intermediário' },
      { nome: 'Gestão de Projetos', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      {
        nome: 'Liderança: inspirando e influenciando pessoas - Alura',
        url: 'https://www.alura.com.br',
      },
      {
        nome: 'Leading People and Teams Specialization - University of Michigan (Coursera) [GRATUITO]',
        url: 'https://www.coursera.org',
      },
      { nome: 'Leadership: Practical Leadership Skills - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'financas_analise',
    nome: 'Análise Financeira',
    area: 'financas',
    skillsNecessarias: ['excel', 'sql'],
    descricao: 'Analise dados financeiros e forneça insights estratégicos para tomada de decisão.',
    habilidadesNecessarias: [
      { nome: 'Excel', nivel: 'Intermediário' },
      { nome: 'SQL', nivel: 'Básico' },
      { nome: 'Matemática Financeira', nivel: 'Intermediário' },
    ],
    cursosRecomendados: [
      { nome: 'Excel aplicado à análise financeira - Alura', url: 'https://www.alura.com.br' },
      {
        nome: 'Financial Analysis and Reporting Specialization - Coursera',
        url: 'https://www.coursera.org',
      },
      { nome: 'Excel para Análise Financeira - Udemy', url: 'https://www.udemy.com' },
    ],
    tipo: 'avancada',
  },
  {
    id: 'atendimento_cs',
    nome: 'Customer Success',
    area: 'atendimento',
    skillsNecessarias: ['atendimento_cliente', 'comunicacao', 'crm'],
    descricao: 'Especialize-se em Customer Success e garanta a satisfação e retenção de clientes.',
    habilidadesNecessarias: [
      { nome: 'Atendimento ao Cliente', nivel: 'Intermediário' },
      { nome: 'Comunicação', nivel: 'Intermediário' },
      { nome: 'CRM', nivel: 'Básico' },
    ],
    cursosRecomendados: [
      { nome: 'Customer Success: estratégias e práticas - Alura', url: 'https://www.alura.com.br' },
      { nome: 'Customer Success Management - Coursera', url: 'https://www.coursera.org' },
      {
        nome: 'Customer Success: How to Reduce Churn and Grow Revenue - Udemy',
        url: 'https://www.udemy.com',
      },
    ],
    tipo: 'avancada',
  },
];

// Função principal para recomendar trilhas
export function recomendarTrilhas({ areasSelecionadas, skillsSelecionadas }) {
  const resultado = [];

  // Caso 1: nenhuma skill → apenas trilhas introdutórias gerais
  if (!skillsSelecionadas || skillsSelecionadas.length === 0) {
    const trilhasGerais = TRILHAS_INTRODUTORIAS.filter(
      trilha =>
        (areasSelecionadas.includes(trilha.area) || trilha.area === 'outros') && !trilha.ensinaSkill // Mostra apenas as gerais, não as específicas
    );
    // Garantir no mínimo 3 trilhas (pode incluir trilhas de outras áreas se necessário)
    if (trilhasGerais.length < 3) {
      const todasTrilhasGerais = TRILHAS_INTRODUTORIAS.filter(t => !t.ensinaSkill);
      const trilhasAdicionais = todasTrilhasGerais
        .filter(t => !trilhasGerais.find(tg => tg.id === t.id))
        .slice(0, 3 - trilhasGerais.length);
      trilhasGerais.push(...trilhasAdicionais);
    }
    return trilhasGerais.slice(0, Math.max(3, trilhasGerais.length));
  }

  // Caso 2: usuário tem skills
  // Verificar trilhas avançadas onde o usuário TEM TODAS as skills necessárias
  const trilhasAvancadasDisponiveis = TRILHAS_AVANCADAS.filter(trilha => {
    // Verifica se a área bate
    if (!areasSelecionadas.includes(trilha.area)) {
      return false;
    }

    // Verifica se o usuário TEM TODAS as skills necessárias
    const temTodasSkills = trilha.skillsNecessarias.every(skill =>
      skillsSelecionadas.includes(skill)
    );

    return temTodasSkills;
  });

  // Adicionar trilhas avançadas que o usuário pode fazer
  resultado.push(...trilhasAvancadasDisponiveis);

  // Caso 3: Verificar trilhas avançadas que o usuário QUASE pode fazer
  // (tem algumas skills mas falta pelo menos uma)
  const skillsFaltantes = new Set();

  TRILHAS_AVANCADAS.forEach(trilha => {
    // Verifica se a área bate
    if (!areasSelecionadas.includes(trilha.area)) {
      return;
    }

    // Verifica se o usuário TEM ALGUMA skill mas não TODAS
    const temAlgumaSkill = trilha.skillsNecessarias.some(skill =>
      skillsSelecionadas.includes(skill)
    );
    const temTodasSkills = trilha.skillsNecessarias.every(skill =>
      skillsSelecionadas.includes(skill)
    );

    // Se tem alguma mas não todas, identifica as skills faltantes
    if (temAlgumaSkill && !temTodasSkills) {
      trilha.skillsNecessarias.forEach(skill => {
        if (!skillsSelecionadas.includes(skill)) {
          skillsFaltantes.add(skill);
        }
      });
    }
  });

  // Adicionar trilhas introdutórias específicas para aprender as skills faltantes
  // IMPORTANTE: Só mostra trilhas introdutórias para skills que o usuário NÃO TEM
  skillsFaltantes.forEach(skillFaltante => {
    // Verificar se o usuário já tem essa skill (não deve mostrar se já tem)
    if (skillsSelecionadas.includes(skillFaltante)) {
      return; // Pula essa trilha introdutória
    }

    const trilhaIntro = TRILHAS_INTRODUTORIAS.find(t => t.ensinaSkill === skillFaltante);
    if (trilhaIntro && !resultado.find(t => t.id === trilhaIntro.id)) {
      resultado.push(trilhaIntro);
    }
  });

  // Filtrar trilhas introdutórias que já estão no resultado mas o usuário já tem a skill
  const resultadoFiltrado = resultado.filter(trilha => {
    // Se a trilha ensina uma skill específica
    if (trilha.ensinaSkill) {
      // Só incluir se o usuário NÃO tem essa skill
      return !skillsSelecionadas.includes(trilha.ensinaSkill);
    }
    // Se não ensina skill específica (trilhas gerais), incluir
    return true;
  });

  // Se ainda não encontrou nada, mostrar trilhas introdutórias gerais
  // (mas apenas as que não ensinam skills que o usuário já tem)
  if (resultadoFiltrado.length === 0) {
    const trilhasGerais = TRILHAS_INTRODUTORIAS.filter(trilha => {
      // Verifica se está nas áreas selecionadas ou é "outros"
      const areaOk = areasSelecionadas.includes(trilha.area) || trilha.area === 'outros';
      // Não mostra trilhas específicas por skill (só as gerais)
      const naoEnsinaSkillEspecifica = !trilha.ensinaSkill;
      // Se ensina uma skill específica, verifica se o usuário NÃO tem essa skill
      const naoTemSkill = trilha.ensinaSkill
        ? !skillsSelecionadas.includes(trilha.ensinaSkill)
        : true;

      return areaOk && naoEnsinaSkillEspecifica && naoTemSkill;
    });
    return trilhasGerais;
  }

  // Garantir no mínimo 3 trilhas
  // Se tiver menos de 3, completar com trilhas introdutórias gerais
  if (resultadoFiltrado.length < 3) {
    const trilhasGeraisDisponiveis = TRILHAS_INTRODUTORIAS.filter(trilha => {
      // Verifica se está nas áreas selecionadas ou é "outros"
      const areaOk = areasSelecionadas.includes(trilha.area) || trilha.area === 'outros';
      // Não mostra trilhas específicas por skill (só as gerais)
      const naoEnsinaSkillEspecifica = !trilha.ensinaSkill;
      // Se ensina uma skill específica, verifica se o usuário NÃO tem essa skill
      const naoTemSkill = trilha.ensinaSkill
        ? !skillsSelecionadas.includes(trilha.ensinaSkill)
        : true;
      // Não incluir trilhas que já estão no resultado
      const naoEstaNoResultado = !resultadoFiltrado.find(t => t.id === trilha.id);

      return areaOk && naoEnsinaSkillEspecifica && naoTemSkill && naoEstaNoResultado;
    });

    // Adicionar trilhas gerais até chegar a 3
    const quantidadeFaltante = 3 - resultadoFiltrado.length;
    const trilhasParaAdicionar = trilhasGeraisDisponiveis.slice(0, quantidadeFaltante);
    resultadoFiltrado.push(...trilhasParaAdicionar);
  }

  return resultadoFiltrado;
}

// Função para buscar trilha por ID
export function getTrilhaById(trilhaId) {
  const todasTrilhas = [...TRILHAS_INTRODUTORIAS, ...TRILHAS_AVANCADAS];
  return todasTrilhas.find(trilha => trilha.id === trilhaId);
}
