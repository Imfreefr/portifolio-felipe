export const personalInfo = {
  name: "Felipe Souza Nascimento",
  title: "Web Designer & Web Developer",
  tagline: "Transformo ideias em experiências digitais.",
  description: "Desenvolvo sites, sistemas e experiências digitais modernas, funcionais e pensadas para as necessidades de cada projeto.",
  whatsapp: {
    number: "+55 71 98219-1577",
    link: "https://wa.me/5571982191577",
    messages: {
      orcamento: "Olá Felipe! Vi seu portfólio e gostaria de solicitar um orçamento para um projeto.",
      desenvolvimento: "Olá Felipe! Gostaria de conversar sobre o desenvolvimento de um site ou sistema.",
      contato: "Olá Felipe! Vi seu portfólio e gostaria de conversar com você.",
    }
  },
  location: "Brasil",
  email: "",
  social: {
    github: {
      username: "ImFreeFr",
      url: "https://github.com/ImFreeFr",
      label: "GitHub"
    },
    instagram: {
      username: "fp_souzx",
      url: "https://www.instagram.com/fp_souzx/",
      label: "Instagram"
    },
    linkedin: {
      username: "felipe-souza-nascimento-915615228",
      url: "https://www.linkedin.com/in/felipe-souza-nascimento-915615228/",
      label: "LinkedIn"
    }
  }
};

export const aboutText = `Sou um profissional de tecnologia com formação técnica em informática e paixão por desenvolvimento web. Minha trajetória inclui conquistas como a Medalha de Ouro na Olimpíada Brasileira de Robótica (OBR), que reforçou meu pensamento analítico, lógica e capacidade de resolução de problemas complexos. Também possuo certificação MOS como Especialista em Excel, demonstrando domínio em produtividade e análise de dados.

Atuo como Web Designer e Web Developer, criando soluções digitais que unem design moderno, código limpo e experiência do usuário excepcional. Meu foco está em desenvolver sites institucionais, landing pages, sistemas web personalizados e interfaces que convertem visitantes em clientes.

Utilizo tecnologias modernas como HTML, CSS, JavaScript, PHP, Laravel e MySQL para construir projetos robustos, escaláveis e performáticos. Cada projeto é pensado sob medida, com atenção aos detalhes, responsividade e boas práticas de desenvolvimento.`;

export interface Project {
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: string;
  url?: string;
  github?: string;
}

export const recursosVisuais = {
  about: ['/images/about/developer-workspace.svg'],
  services: ['/images/services/digital-interface.svg'],
  portfolio: ['/images/portfolio/web-system.svg'],
  solutions: ['/images/solutions/digital-solutions.svg'],
  formation: ['/images/formation/technology-education.svg'],
  contact: ['/images/contact/communication.svg'],
};

export const services = [
  {
    id: 1,
    title: "Desenvolvimento de Sites",
    description: "Sites modernos, responsivos e otimizados para performance e SEO.",
    icon: "Globe",
    category: "Front-end",
  },
  {
    id: 2,
    title: "Landing Pages",
    description: "Páginas de alta conversão focadas em capturar leads e vender.",
    icon: "Target",
    category: "Marketing",
  },
  {
    id: 3,
    title: "Sites Institucionais",
    description: "Presença digital profissional para empresas e organizações.",
    icon: "Building",
    category: "Corporativo",
  },
  {
    id: 4,
    title: "Sistemas Web",
    description: "Aplicações web completas, seguras e escaláveis sob medida.",
    icon: "Database",
    category: "Full-stack",
  },
  {
    id: 5,
    title: "Desenvolvimento Front-end",
    description: "Interfaces modernas, acessíveis e performáticas com HTML, CSS e JavaScript.",
    icon: "Layout",
    category: "Front-end",
  },
  {
    id: 6,
    title: "Desenvolvimento Back-end",
    description: "APIs robustas, arquitetura limpa e banco de dados otimizado com PHP/Laravel.",
    icon: "Server",
    category: "Back-end",
  },
  {
    id: 7,
    title: "Design de Interfaces",
    description: "UI/UX focado em usabilidade, acessibilidade e identidade visual.",
    icon: "Palette",
    category: "Design",
  },
  {
    id: 8,
    title: "Sistemas Personalizados",
    description: "Soluções sob medida para necessidades específicas do seu negócio.",
    icon: "Cpu",
    category: "Custom",
  },
];

export const technologies = [
  {
    id: "html",
    name: "HTML",
    category: "Front-end",
    description: "Linguagem de marcação semântica para estruturação de conteúdo web acessível e otimizado para SEO.",
    color: "#E34F26",
    icon: "Html5",
  },
  {
    id: "css",
    name: "CSS",
    category: "Front-end",
    description: "Estilização moderna com Flexbox, Grid, Custom Properties, animações e design responsivo mobile-first.",
    color: "#1572B6",
    icon: "Css3",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Front-end",
    description: "Desenvolvimento moderno com ES6+, módulos, async/await, DOM manipulation e arquitetura componentizada.",
    color: "#F7DF1E",
    icon: "Javascript",
  },
  {
    id: "php",
    name: "PHP",
    category: "Back-end",
    description: "Desenvolvimento server-side com PHP 8+, tipagem estrita, atributos e performance otimizada.",
    color: "#777BB4",
    icon: "Php",
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "Back-end",
    description: "Framework PHP elegante para aplicações robustas: Eloquent ORM, migrations, queues, testing e segurança.",
    color: "#FF2D20",
    icon: "Laravel",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Back-end",
    description: "Banco de dados relacional: modelagem, queries otimizadas, índices, transações e performance tuning.",
    color: "#4479A1",
    icon: "Mysql",
  },
  {
    id: "git",
    name: "Git",
    category: "Ferramentas",
    description: "Controle de versão distribuído: branching, merging, rebasing, hooks e workflows colaborativos.",
    color: "#F05032",
    icon: "Git",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Ferramentas",
    description: "Plataforma de hospedagem de código: Actions CI/CD, Projects, Codespaces, security scanning e colaboração.",
    color: "#181717",
    icon: "Github",
  },
];

export const solutionTypes = [
  {
    id: "logistica",
    title: "Sistema de Gerenciamento Logístico",
    description: "Controle de frotas, rotas, entregas e estoque em tempo real.",
    icon: "Truck",
    category: "Logística",
  },
  {
    id: "caixa",
    title: "Sistema de Caixa (PDV)",
    description: "Ponto de venda completo com gestão de vendas, produtos e relatórios.",
    icon: "ShoppingCart",
    category: "Varejo",
  },
  {
    id: "petshop",
    title: "Sistema para Petshop",
    description: "Agendamento, banho/tosa, produtos, clientes e fidelidade.",
    icon: "PawPrint",
    category: "Pet",
  },
  {
    id: "doces",
    title: "Loja de Doces / Confeitaria",
    description: "Cardápio digital, encomendas, produção e entrega programada.",
    icon: "Cake",
    category: "Alimentação",
  },
  {
    id: "landing",
    title: "Landing Page de Alta Conversão",
    description: "Páginas focadas em captura de leads e vendas com A/B testing.",
    icon: "Target",
    category: "Marketing",
  },
  {
    id: "institucional",
    title: "Site Institucional Profissional",
    description: "Apresentação da empresa, serviços, blog, cases e contato.",
    icon: "Building",
    category: "Corporativo",
  },
  {
    id: "academia",
    title: "Sistema para Academia",
    description: "Gestão de alunos, treinos, pagamentos, acesso e relatórios.",
    icon: "Dumbbell",
    category: "Fitness",
  },
  {
    id: "barbearia",
    title: "Sistema para Barbearia",
    description: "Agendamento online, fila de espera, fidelidade e gestão de barbeiros.",
    icon: "Scissors",
    category: "Beleza",
  },
  {
    id: "personalizado",
    title: "Sistema Personalizado",
    description: "Desenvolvimento sob medida para sua necessidade específica.",
    icon: "Cpu",
    category: "Custom",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Medalha de Ouro na OBR",
    subtitle: "Olimpíada Brasileira de Robótica",
    description: "Conquista que demonstra domínio em tecnologia, robótica, lógica, resolução de problemas e pensamento analítico.",
    icon: "Award",
    color: "#FFD700",
    category: "Tecnologia & Robótica",
  },
  {
    id: 2,
    title: "Especialista em Excel",
    subtitle: "Certificação MOS (Microsoft Office Specialist)",
    description: "Certificação oficial Microsoft comprovando expertise avançado em Excel para produtividade, análise de dados e automação.",
    icon: "FileSpreadsheet",
    color: "#217346",
    category: "Produtividade & Dados",
  },
  {
    id: 3,
    title: "Curso Técnico em Informática",
    subtitle: "Formação Técnica em Tecnologia da Informação",
    description: "Formação técnica completa na área de tecnologia da informação, base sólida para desenvolvimento de software e sistemas.",
    icon: "GraduationCap",
    color: "#0ea5e9",
    category: "Formação Acadêmica",
  },
];

export const differentials = [
  "Formação técnica em informática",
  "Medalha de Ouro na OBR (Olimpíada Brasileira de Robótica)",
  "Especialização em Excel pela MOS (Microsoft Office Specialist)",
  "Conhecimento aprofundado em tecnologias modernas de desenvolvimento web",
  "Desenvolvimento 100% personalizado — sem templates prontos",
  "Design moderno, responsivo e centrado no usuário",
  "Código limpo, organizado e seguindo boas práticas",
  "Atenção especial à experiência do usuário (UX) e acessibilidade",
  "Soluções pensadas especificamente para cada necessidade",
  "Comunicação clara e transparente durante todo o projeto",
];

export const processSteps = [
  {
    step: "01",
    title: "Conversa inicial",
    description: "Entendimento profundo das suas necessidades, objetivos e expectativas para o projeto.",
  },
  {
    step: "02",
    title: "Planejamento",
    description: "Definição da arquitetura, tecnologias, cronograma e escopo detalhado da solução.",
  },
  {
    step: "03",
    title: "Design",
    description: "Estruturação da experiência do usuário (UX) e criação da interface visual (UI).",
  },
  {
    step: "04",
    title: "Desenvolvimento",
    description: "Construção do projeto com código limpo, testes contínuos e versionamento.",
  },
  {
    step: "05",
    title: "Testes",
    description: "Validação completa: funcionalidade, responsividade, performance, acessibilidade e cross-browser.",
  },
  {
    step: "06",
    title: "Entrega",
    description: "Projeto pronto para uso, com documentação, treinamento se necessário e suporte pós-entrega.",
  },
];

export const contactInfo = {
  name: "Felipe Souza Nascimento",
  title: "Web Designer & Web Developer",
  whatsapp: "+55 (71) 98219-1577",
  whatsappLink: "https://wa.me/5571982191577",
};

export const seo = {
  title: "Felipe Souza Nascimento | Web Designer & Web Developer",
  description: "Felipe Souza Nascimento — Web Designer e Web Developer. Desenvolvimento de sites, sistemas web e soluções digitais personalizadas.",
  ogImage: "/og-image.svg",
  url: "https://felipesouzanascimento.dev",
};