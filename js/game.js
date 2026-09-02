const STORAGE_KEY = 'ecoquest-save-v1';
const RANKING_KEY = 'ecoquest-ranking-v1';

const campaignPhases = [
  { id: 1, name: 'Fase 1', title: 'Cidade em crise', goal: 'Aprender o básico da gestão urbana sustentável.' },
  { id: 2, name: 'Fase 2', title: 'Água limpa', goal: 'Resolver problemas hídricos e de saneamento.' },
  { id: 3, name: 'Fase 3', title: 'Cidade verde', goal: 'Reflorestamento e equilíbrio ecológico.' },
  { id: 4, name: 'Fase 4', title: 'Energia', goal: 'Expandir energia renovável.' },
  { id: 5, name: 'Fase 5', title: 'Lixo', goal: 'Reciclagem e redução de resíduos.' },
  { id: 6, name: 'Fase 6', title: 'Mobilidade', goal: 'Reduzir trânsito e poluição.' },
  { id: 7, name: 'Fase 7', title: 'Biodiversidade', goal: 'Proteger fauna e habitats.' },
  { id: 8, name: 'Fase 8', title: 'Economia', goal: 'Investimentos verdes e retorno financeiro.' },
  { id: 9, name: 'Fase 9', title: 'Emergência climática', goal: 'Preparar a cidade para crises.' },
  { id: 10, name: 'Fase 10', title: 'EcoCity', goal: 'Transformar completamente a cidade.' },
];

const cityStages = [
  { stage: 1, title: 'Cidade em crise', emoji: '🏭🏭🌫️🗑️🌳❌💧❌', badge: 'badge-alert' },
  { stage: 2, title: 'Recuperação', emoji: '🏭🌳🗑️♻️🚗', badge: 'badge-alert' },
  { stage: 3, title: 'Cidade equilibrada', emoji: '🌳🏡🚲♻️🚌🌊', badge: 'badge-alert' },
  { stage: 4, title: 'Cidade sustentável', emoji: '🌳🌳☀️🚲🚌🔋♻️', badge: 'badge-safe' },
  { stage: 5, title: 'EcoCity', emoji: '🌳🌳🌳☀️🏠🚲🚍🔋🌊🐢', badge: 'badge-safe' },
];

const actionCatalog = {
  cidade: [
    { id: 'industry', title: 'Construir uma grande indústria', description: 'Gera moedas e empregos, mas cria poluição e impactos no meio ambiente.', cost: 0, money: 200, delta: { quality: 4, pollution: 15, nature: -10, water: -5 }, tags: '💼 Economia / 🌫️ Impacto' },
    { id: 'greenpark', title: 'Parque urbano sustentável', description: 'A área verde melhora a qualidade de vida e reduz o calor urbano.', cost: 120, delta: { nature: 12, quality: 8, water: 4, pollution: -7 }, tags: '🌳 Natureza' },
    { id: 'waterplant', title: 'Estação de tratamento de água', description: 'A cidade melhora a qualidade da água e reduz riscos de contaminação.', cost: 140, delta: { water: 14, quality: 7, pollution: -5 }, tags: '💧 Água' },
    { id: 'housing', title: 'Reforma de bairros', description: 'Melhora moradia, acessibilidade e sensação de bem-estar da população.', cost: 100, delta: { quality: 12, approval: 4 }, tags: '🏡 Qualidade de vida' },
    { id: 'rain-gardens', title: 'Jardins de chuva', description: 'Bosques de drenagem natural reduzem enchentes e revitalizam praças.', cost: 110, delta: { water: 10, nature: 9, pollution: -6, quality: 5 }, tags: '🌧️ Drenagem natural' },
    { id: 'green-roofs', title: 'Telhados verdes', description: 'Coberturas com vegetação reduzem calor e aumentam o verde da cidade.', cost: 130, delta: { nature: 11, quality: 7, pollution: -5, energy: 3 }, tags: '🌿 Arquitetura sustentável' },
    { id: 'smart-lighting', title: 'Iluminação inteligente', description: 'Reduz consumo elétrico e melhora segurança pública em bairros.', cost: 95, delta: { energy: 9, quality: 5, pollution: -4 }, tags: '💡 Eficiência urbana' },
    { id: 'public-park', title: 'Parques de bairro', description: 'Novos espaços verdes aumentam bem-estar, lazer e identificação local.', cost: 150, delta: { nature: 13, quality: 9, approval: 6 }, tags: '🌳 Lazer e bem-estar' },
  ],
  laboratorio: [
    { id: 'filter', title: 'Filtro inteligente', description: 'Tecnologia para purificar água com menor custo e maior eficiência.', cost: 150, delta: { water: 12, quality: 8, pollution: -4 }, tech: true, tags: '💧 Purificação' },
    { id: 'solar', title: 'Painéis solares eficientes', description: 'Expande a geração de energia renovável e reduz emissões.', cost: 200, delta: { energy: 16, pollution: -8, quality: 5 }, tech: true, tags: '☀️ Energia' },
    { id: 'recycling-auto', title: 'Reciclagem automática', description: 'Reduz o lixo crescente e aumenta a capacidade de reciclagem urbana.', cost: 250, delta: { recycling: 15, pollution: -10, quality: 6 }, tech: true, tags: '♻️ Reciclagem' },
    { id: 'battery', title: 'Baterias urbanas', description: 'Aumenta a resiliência da cidade e estabiliza a energia local.', cost: 300, delta: { energy: 14, quality: 6, pollution: -6 }, tech: true, tags: '🔋 Infraestrutura' },
    { id: 'electric-bus', title: 'Transporte elétrico', description: 'Moderniza a frota e reduz congestionamento e poluição urbana.', cost: 350, delta: { energy: 10, pollution: -12, quality: 9 }, tech: true, tags: '🚍 Mobilidade' },
    { id: 'microgrid', title: 'Micro-rede urbana', description: 'Distribui energia local, reduz quedas de energia e melhora resiliência.', cost: 280, delta: { energy: 15, quality: 6, pollution: -8 }, tech: true, tags: '⚡ Resiliência' },
    { id: 'water-sensor', title: 'Sensores de água', description: 'A cidade detecta vazamentos e desperdícios antes que se tornem crise.', cost: 180, delta: { water: 10, quality: 6 }, tech: true, tags: '📡 Monitoramento' },
    { id: 'biofilter', title: 'Biofiltros verdes', description: 'Melhora ar e água com tratamentos naturais e de baixo custo.', cost: 220, delta: { water: 8, nature: 10, pollution: -9, quality: 5 }, tech: true, tags: '🌿 Tratamento natural' },
  ],
  mobilidade: [
    { id: 'bike-lane', title: 'Ciclovias', description: 'Incentiva o uso de bicicletas e reduz o trânsito.', cost: 120, delta: { quality: 6, pollution: -8 }, transport: { cars: -8, bus: 0, bikes: 10 }, tags: '🚲 Sustentável' },
    { id: 'electric-bus', title: 'Ônibus elétricos', description: 'A melhora no transporte público reduz congestionamento.', cost: 180, delta: { quality: 8, pollution: -10, energy: 6 }, transport: { cars: -6, bus: 12, bikes: 2 }, tags: '🚌 Transporte' },
    { id: 'metro', title: 'Expansão de metrô', description: 'A cidade passa a depender menos de veículos particulares.', cost: 220, delta: { quality: 10, pollution: -12, energy: 5 }, transport: { cars: -12, bus: 8, bikes: 4 }, tags: '🚇 Infraestrutura' },
    { id: 'sidewalks', title: 'Calçadas e pedestres', description: 'Melhora mobilidade, segurança e qualidade de vida urbana.', cost: 100, delta: { quality: 7, approval: 5 }, transport: { bikes: 4, cars: -4 }, tags: '🚶 Seguridade' },
  ],
  reciclagem: [
    { id: 'coop-level1', title: 'Cooperativa de reciclagem nível 1', description: 'Organiza a coleta e reduz a geração de lixo na cidade.', cost: 60, delta: { recycling: 10, pollution: -6 }, tags: '♻️ Coleta' },
    { id: 'coop-level2', title: 'Cooperativa nível 2', description: 'Mais pontos de coleta e um sistema mais eficiente.', cost: 120, delta: { recycling: 14, pollution: -8, quality: 3 }, tags: '♻️ Produção' },
    { id: 'compost', title: 'Programa de compostagem', description: 'Transforma resíduos orgânicos em nutrientes e reduz lixo urbano.', cost: 90, delta: { recycling: 11, nature: 6, water: 5 }, tags: '🌱 Compostagem' },
  ],
  animais: [
    { id: 'turtles', title: 'Proteção das tartarugas', description: 'Ações para preservar habitats aquáticos e reduzir poluição do rio.', cost: 110, delta: { water: 9, nature: 10, quality: 6 }, tags: '🐢 Fauna' },
    { id: 'reforest', title: 'Restauração de corredores ecológicos', description: 'Mais áreas verdes para animais e equilíbrio ambiental.', cost: 130, delta: { nature: 12, water: 6, quality: 5 }, tags: '🌳 Habitat' },
    { id: 'wetland', title: 'Viveiros e áreas úmidas', description: 'Amplia proteção a espécies e melhora a absorção de água.', cost: 160, delta: { water: 10, nature: 12, pollution: -6 }, tags: '🌊 Biodiversidade' },
  ],
  banco: [
    { id: 'solar-bank', title: 'Energia solar', description: 'Invista agora e receba renda imediata e dividendos após 3 anos.', cost: 100, money: 160, delta: { energy: 10, quality: 3 }, tags: '☀️ Recebe: 200 | Lucro: +100', pending: { name: 'Usinas solares começaram a funcionar', delay: 3, effect: { energy: 10, quality: 2, money: 40 } } },
    { id: 'reforest-bank', title: 'Reflorestamento produtivo', description: 'Recupera áreas verdes e gera retorno com créditos ambientais.', cost: 100, money: 140, delta: { nature: 10, water: 8, quality: 5 }, tags: '🌳 Recebe: 140 | Lucro: +40' },
    { id: 'mobility-bank', title: 'Mobilidade sustentável', description: 'Reduz custos de transporte e gera retorno para o orçamento.', cost: 100, money: 180, delta: { quality: 6, pollution: -8 }, tags: '🚲 Recebe: 180 | Lucro: +80' },
    { id: 'local-market', title: 'Feira de produtores locais', description: 'Movimenta o comércio do bairro e devolve mais moedas do que o investimento.', cost: 70, money: 150, delta: { quality: 4, approval: 2 }, tags: '🧺 Lucro líquido: +80' },
    { id: 'eco-tourism', title: 'Turismo ecológico', description: 'Parques e rios preservados atraem visitantes e geram uma receita maior.', cost: 160, money: 300, delta: { nature: 5, quality: 6, pollution: -3 }, tags: '🗺️ Lucro líquido: +140' },
    { id: 'recycled-materials', title: 'Venda de materiais reciclados', description: 'Transforma resíduos separados em matéria-prima e renda para a cidade.', cost: 60, money: 145, delta: { recycling: 8, pollution: -4 }, tags: '♻️ Lucro líquido: +85' },
    { id: 'water-savings', title: 'Programa de economia de água', description: 'Reduz desperdícios e gera retorno com a economia no abastecimento.', cost: 90, money: 180, delta: { water: 8, quality: 3 }, tags: '💧 Lucro líquido: +90' },
  ],
};

const eventTemplates = [
  { title: '🌧️ Chuvas intensas', description: 'Uma forte chuva atingiu a cidade. O sistema de drenagem não suporta o volume de água.', choices: [ { text: 'Construir drenagem', cost: 150, delta: { water: 10, quality: 5 }, effectText: 'Canais e reservatórios reduziram o risco de alagamento.' }, { text: 'Criar áreas verdes', cost: 100, delta: { nature: 8, water: 5 }, effectText: 'Áreas verdes absorveram parte da água e melhoraram o microclima.' }, { text: 'Não fazer nada', delta: { quality: -10, water: -10 }, effectText: 'A rua virou problema de enchentes e a população ficou insatisfeita.' } ] },
  { title: '🔥 Onda de calor', description: 'A cidade vive calor extremo, com aumento do consumo elétrico e riscos à saúde pública.', choices: [ { text: 'Investir em sombreamento', cost: 90, delta: { quality: 7, energy: -3, nature: 6 }, effectText: 'Arvores e sombreamento reduziram o impacto térmico.' }, { text: 'Expandir energia solar', cost: 120, delta: { energy: 12, pollution: -5 }, effectText: 'A energia nova suavizou a carga da rede durante o pico do calor.' }, { text: 'Ignorar a crise', delta: { quality: -12, energy: -10, water: -8 }, effectText: 'A população enfrentou calor, consumo alto e risco de apagões.' } ] },
  { title: '🌊 Enchente', description: 'Áreas baixas da cidade foram atingidas e muitos bairros sofreram danos.', choices: [ { text: 'Reforçar margens e barragens', cost: 180, delta: { water: 12, quality: 5, nature: 4 }, effectText: 'A infraestrutura de proteção ajudou a reduzir os danos.' }, { text: 'Recuperar áreas verdes', cost: 110, delta: { nature: 10, water: 8 }, effectText: 'A vegetação conseguiu diminuir a velocidade da água e as perdas.' }, { text: 'Não intervir', delta: { quality: -14, nature: -8, water: -10 }, effectText: 'Os impactos foram maiores e a população criticou a gestão.' } ] },
  { title: '🐢 Espécie ameaçada', description: 'Um grupo de animais começou a desaparecer por conta da poluição do rio e da perda de habitats.', choices: [ { text: 'Salvar o habitat', cost: 140, delta: { nature: 11, water: 9, quality: 7 }, effectText: 'O ecossistema voltou a receber atenção e os animais passaram a voltar.' }, { text: 'Investir em educação ambiental', cost: 80, delta: { quality: 5, nature: 6 }, effectText: 'Moradores se uniram para cuidar do entorno e reduzir riscos.' }, { text: 'Ignorar a situação', delta: { nature: -10, water: -8, quality: -8 }, effectText: 'A ausência de resposta fez a população ficar inquieta.' } ] },
  { title: '🌬️ Tempestade de vento', description: 'Uma tempestade derrubou árvores e causou falhas na rede elétrica da cidade.', choices: [ { text: 'Reforçar rede elétrica', cost: 170, delta: { energy: 13, quality: 6 }, effectText: 'A infraestrutura suportou melhor a tempestade.' }, { text: 'Plantio de árvores resistentes', cost: 110, delta: { nature: 10, quality: 4 }, effectText: 'As árvores mais resistentes reduziram a destruição das áreas verdes.' }, { text: 'Não proteger a cidade', delta: { quality: -12, energy: -12, nature: -9 }, effectText: 'A cidade ficou vulnerável e os danos se agravaram.' } ] },
  { title: '☀️ Seca prolongada', description: 'A falta de chuvas está reduzindo a água disponível e provocando impactos na produção local.', choices: [ { text: 'Reservatórios e captação', cost: 160, delta: { water: 14, quality: 6 }, effectText: 'Os reservatórios ajudaram a manter o abastecimento estável.' }, { text: 'Reflorestar bacias', cost: 120, delta: { nature: 12, water: 8 }, effectText: 'A vegetação ajudou a reter água e reduzir a evaporação.' }, { text: 'Ignorar a seca', delta: { water: -15, quality: -11, energy: -6 }, effectText: 'Os moradores sofreram com a escassez de água e a produtividade caiu.' } ] },
];

const achievementCatalog = [
  { id: 'first-step', name: '🌱 Primeiro Passo', description: 'Faça sua primeira ação sustentável.' },
  { id: 'guardian-forest', name: '🌳 Guardião das Florestas', description: 'Tenha 90+ de Natureza.' },
  { id: 'water-mastery', name: '💧 Mestre da Água', description: 'Tenha 95+ de Água.' },
  { id: 'zero-lixo', name: '♻️ Zero Lixo', description: 'Tenha 100 de Reciclagem.' },
  { id: 'solar-city', name: '☀️ Cidade Solar', description: 'Produza mais energia renovável do que energia convencional.' },
  { id: 'car-free', name: '🚲 Cidade Sem Carros', description: 'Reduza o uso de carros para menos de 20%.' },
  { id: 'animal-guardian', name: '🐢 Guardião dos Animais', description: 'Salve 5 espécies.' },
  { id: 'green-investor', name: '🏦 Investidor Verde', description: 'Obtenha 1.000 moedas por investimentos.' },
  { id: 'ecoprefeito', name: '💚 EcoPrefeito', description: 'Finalize o jogo com 90+ em todos os indicadores.' },
  { id: 'frog-egg', name: '🐸 Você encontrou o sapo', description: 'Easter egg secreto.' },
];

const weatherSystem = [
  { type: 'sunny', emoji: '☀️', name: 'Ensolarado', effect: { energy: 3, pollution: 1 } },
  { type: 'rainy', emoji: '🌧️', name: 'Chuvoso', effect: { water: 5, nature: 2, pollution: -2 } },
  { type: 'drought', emoji: '🏜️', name: 'Seca', effect: { water: -8, energy: 4 } },
  { type: 'heatwave', emoji: '🔥', name: 'Onda de calor', effect: { energy: -6, water: -4, quality: -3 } },
  { type: 'storm', emoji: '⛈️', name: 'Tempestade', effect: { nature: -3, energy: -5, quality: -2 } },
];

const secretMissions = [
  { id: 'forest-guardian', name: '🌳 Guardião das Florestas', goal: 'Plante 100 árvores (Natureza 100)', condition: () => state.nature >= 100, reward: { coins: 150, approval: 5 } },
  { id: 'water-master', name: '💧 Protetor da Água', goal: 'Mantenha água acima de 80 por 5 rodadas', condition: () => state.water >= 80, reward: { coins: 100, approval: 3 } },
  { id: 'clean-city', name: '♻️ Cidade Limpa', goal: 'Recicle 80% dos resíduos', condition: () => state.recycling >= 80, reward: { coins: 120, approval: 4 } },
  { id: 'green-energy', name: '⚡ Cidade Solar', goal: 'Produza 70%+ de energia renovável', condition: () => state.energy >= 70 && state.pollution < 40, reward: { coins: 200, approval: 6 } },
  { id: 'eco-transport', name: '🚲 Mobilidade Sustentável', goal: 'Reduza carros para menos de 25%', condition: () => state.transport.cars <= 25, reward: { coins: 140, approval: 5 } },
];

const secretEvents = [
  { combo: ['greenpark', 'waterplant', 'turtles'], name: '🐢 Retorno das Tartarugas', event: { title: '🐢 Espécie Retornou', description: 'As tartarugas voltaram ao rio limpo e repleto de vegetação.', delta: { nature: 15, water: 10, approval: 8 } } },
  { combo: ['solar', 'battery', 'electric-bus'], name: '⚡ Revolução Energética', event: { title: '⚡ Cidade 100% Solar', description: 'A cidade atingiu a independência energética com fontes renováveis.', delta: { energy: 20, pollution: -15, approval: 10 } } },
  { combo: ['bike-lane', 'metro', 'sidewalks'], name: '🚲 Utopia da Mobilidade', event: { title: '🚲 Sistema Perfeito', description: 'O transporte urbano se tornou um modelo mundial.', delta: { quality: 12, pollution: -10, approval: 12 } } },
  { combo: ['recycling-auto', 'compost', 'coop-level2'], name: '♻️ Zero Waste', event: { title: '♻️ Cidade Zero Lixo', description: 'A cidade alcançou reciclagem 100% e zero resíduos.', delta: { recycling: 20, nature: 8, approval: 10 } } },
];

const newsTemplates = [
  (state) => `📰 Prefeito investe em ${state.energy > 60 ? 'energia solar' : 'projetos ambientais'}. População aprova!`,
  (state) => `📰 Qualidade de vida melhora com ${state.nature > 70 ? 'parques urbanos' : 'reforma de bairros'}.`,
  (state) => `📰 ${state.pollution > 60 ? 'Poluição preocupa especialistas' : 'Ar mais limpo beneficia saúde pública'}.`,
  (state) => `📰 Transporte público ${state.transport.bus > 40 ? 'expande' : 'precisa melhorar'}.`,
  (state) => `📰 Rio da cidade está ${state.water > 80 ? 'revitalizado' : 'ameaçado por poluição'}.`,
];

// ========== SPRINT 3: NOVAS FEATURES ==========
// 🗳️ SISTEMA DE REFERENDO
const referendumProposals = [
  { id: 'ban-cars', title: '🚗 Banir carros da zona central', description: 'Votação para criar zona livre de carros', cost: 200, effect: { quality: 10, pollution: -15 } },
  { id: 'renewable-energy', title: '☀️ Transição 100% Energia Renovável', description: 'Votação para priorizar energia limpa', cost: 300, effect: { energy: 15, pollution: -10 } },
  { id: 'green-budget', title: '🌳 Orçamento 50% Ambiental', description: 'Votação para aumentar gastos verdes', cost: 250, effect: { nature: 12, water: 10, quality: 5 } },
  { id: 'zero-waste-law', title: '♻️ Lei de Zero Resíduos', description: 'Votação para proibir queima de lixo', cost: 180, effect: { recycling: 10, pollution: -8 } },
  { id: 'water-protection', title: '💧 Proteção Integral de Rios', description: 'Votação para criar proteção máxima', cost: 220, effect: { water: 14, nature: 8 } },
];

// 🕰️ MÁQUINA DO TEMPO
const timelineHistory = [];

// 🕵️ INVESTIGAÇÃO AMBIENTAL
const analyzeEnvironment = () => ({
  forestHealth: state.nature > 70 ? 'Excelente' : state.nature > 50 ? 'Bom' : 'Crítico',
  waterQuality: state.water > 70 ? 'Limpa' : state.water > 50 ? 'Moderada' : 'Poluída',
  cleanEnergy: state.energy > 70 ? 'Dominante' : state.energy > 40 ? 'Crescente' : 'Baixa',
  airQuality: state.pollution < 40 ? 'Excelente' : state.pollution < 60 ? 'Aceitável' : 'Crítica',
  biodiversity: state.nature > 80 ? 'Recuperada' : state.nature > 60 ? 'Estável' : 'Ameaçada',
});

// 📜 SISTEMA DE LEIS
const lawCatalog = [
  { id: 'green-law', name: '🌳 Lei Verde', description: 'Toda construção deve incluir espaço verde', effect: { nature: 5, quality: 3 }, votes: 0, totalVotes: 0, passed: false },
  { id: 'energy-law', name: '⚡ Lei de Energia Renovável', description: '80% de energia deve ser limpa', effect: { energy: 8, pollution: -6 }, votes: 0, totalVotes: 0, passed: false },
  { id: 'water-law', name: '💧 Lei de Proteção Hídrica', description: 'Proíbe poluição de rios', effect: { water: 10, nature: 4 }, votes: 0, totalVotes: 0, passed: false },
  { id: 'transport-law', name: '🚲 Lei de Mobilidade', description: 'Investimento em ciclovias', effect: { quality: 6 }, votes: 0, totalVotes: 0, passed: false },
  { id: 'waste-law', name: '♻️ Lei de Reciclagem', description: 'Reciclar 70% dos resíduos', effect: { recycling: 12, pollution: -5 }, votes: 0, totalVotes: 0, passed: false },
];

const taxUpgrades = [
  { id: 'digital-tax', name: '🏛️ Cobrança digital', description: 'Reduz perdas na arrecadação e melhora a eficiência do governo.', cost: 180, rateBonus: 1, approval: 1 },
  { id: 'green-tax-credit', name: '🌱 Incentivo a negócios verdes', description: 'Atrai empresas sustentáveis e aumenta a base de impostos.', cost: 320, rateBonus: 1, approval: 2 },
  { id: 'fair-tax-reform', name: '⚖️ Reforma tributária justa', description: 'Distribui melhor a cobrança e aumenta a arrecadação sem elevar a taxa.', cost: 500, rateBonus: 2, approval: 3 },
];

const state = loadState();
let futureMapMode = false;
let diagnosisMapMode = false;
let expandedMapMode = false;
let mapZoom = 'city';
let selectedMapRegion = null;

function getCampaignPhase() {
  if (state.infiniteMode) return { name: '♾️ Modo Infinito', title: 'Cidade eterna', goal: 'Sobreviver o maior número de rodadas possível.' };
  const phaseIndex = Math.min(campaignPhases.length - 1, Math.max(0, Math.floor((state.round - 1) / 2)));
  return campaignPhases[phaseIndex];
}

function createInitialState() {
  return {
    round: 1,
    coins: 500,
    population: 50000,
    sustainability: 50,
    quality: 50,
    nature: 50,
    water: 50,
    energy: 50,
    recycling: 50,
    pollution: 50,
    approval: 82,
    cityStage: 1,
    transport: { cars: 70, bus: 20, bikes: 10 },
    eventLog: [{ round: 1, text: 'A cidade acordou em crise. A próxima decisão define o rumo do mandato.' }],
    achievements: [],
    pendingProjects: [],
    currentEvent: null,
    techs: [],
    ecoScore: 0,
    savedAt: Date.now(),
    ranking: [],
    infiniteMode: false,
    groups: { moradores: 82, ambientalistas: 68, empresarios: 60, jovens: 74 },
    modal: null,
    lastElectionRound: 0,
    currentWeather: 'sunny',
    secretMissions: [],
    completedMissions: [],
    actionsHistory: [],
    consequenceChain: [],
    unlockedSecretEvents: [],
    socialFeed: [
      { user: 'Moradora', text: 'A cidade precisa de mais áreas verdes e menos trânsito.', mood: 'positivo' },
      { user: 'Jovem', text: 'A energia limpa é a melhor saída para o futuro.', mood: 'positivo' },
      { user: 'Empresário', text: 'Investir em infraestrutura sustentável traz retorno.', mood: 'neutro' },
    ],
    // SPRINT 3: Novas features
    referendums: [],
    passedReferendums: [],
    timelineHistory: [{ round: 1, snapshot: 'Cidade em crise (50 sustentabilidade)' }],
    laws: [],
    passedLaws: [],
    lastAnalysisRound: 0,
    taxRate: 4,
    taxLevel: 0,
    taxIncomeTotal: 0,
    lastTaxCollection: 0,
    decisionSnapshots: [],
    futureImpact: 0,
    inequality: 50,
  };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return createInitialState();
  try {
    const parsed = JSON.parse(saved);
    return {
      ...createInitialState(),
      ...parsed,
      transport: { ...createInitialState().transport, ...(parsed.transport || {}) },
      groups: { ...createInitialState().groups, ...(parsed.groups || {}) },
      pendingProjects: parsed.pendingProjects || [],
      eventLog: parsed.eventLog || [],
      achievements: parsed.achievements || [],
      currentEvent: parsed.currentEvent || null,
      currentWeather: parsed.currentWeather || 'sunny',
      secretMissions: parsed.secretMissions || [],
      completedMissions: parsed.completedMissions || [],
      actionsHistory: parsed.actionsHistory || [],
      consequenceChain: parsed.consequenceChain || [],
      unlockedSecretEvents: parsed.unlockedSecretEvents || [],
      socialFeed: parsed.socialFeed || createInitialState().socialFeed,
      taxRate: parsed.taxRate || 4,
      taxLevel: parsed.taxLevel || 0,
      taxIncomeTotal: parsed.taxIncomeTotal || 0,
      lastTaxCollection: parsed.lastTaxCollection || 0,
      decisionSnapshots: parsed.decisionSnapshots || [],
      futureImpact: parsed.futureImpact || 0,
      inequality: parsed.inequality || 50,
    };
  } catch (error) {
    return createInitialState();
  }
}

function saveState() {
  state.savedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function saveRanking() {
  const entry = { name: 'Prefeito Local', score: Math.round((state.sustainability + state.quality + state.nature + state.water + state.energy + state.recycling + state.approval) / 2), round: state.round };
  const rankings = JSON.parse(localStorage.getItem(RANKING_KEY) || '[]');
  rankings.push(entry);
  rankings.sort((a, b) => b.score - a.score || b.round - a.round);
  localStorage.setItem(RANKING_KEY, JSON.stringify(rankings.slice(0, 5)));
}

function renderRanking() {
  const list = document.getElementById('rankingList');
  if (!list) return;
  const ranking = JSON.parse(localStorage.getItem(RANKING_KEY) || '[]');
  if (!ranking.length) { list.innerHTML = '<li><span>Sem registros</span><strong>0</strong></li>'; return; }
  list.innerHTML = ranking.map((item, index) => `<li><span>${index + 1}º ${item.name}</span><strong>${item.score}</strong></li>`).join('');
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function average(values) { return values.reduce((sum, value) => sum + value, 0) / values.length; }

function getStageData(stage) { return cityStages.find((item) => item.stage === stage) || cityStages[0]; }

function updateSustainability() { state.sustainability = clamp(Math.round(average([state.nature, state.water, state.energy, state.recycling, state.quality]))); }

function updateApproval() {
  const score = state.quality * 0.35 + state.nature * 0.15 + state.water * 0.15 + state.energy * 0.15 + state.recycling * 0.2 - state.pollution * 0.2;
  state.approval = clamp(Math.round(score));
}

function updateStage() {
  const sustainabilityScore = state.sustainability;
  let stage = 1;
  if (sustainabilityScore >= 90) stage = 5;
  else if (sustainabilityScore >= 75) stage = 4;
  else if (sustainabilityScore >= 60) stage = 3;
  else if (sustainabilityScore >= 45) stage = 2;
  state.cityStage = stage;
}

function applyDelta(delta) {
  if (!delta) return;
  const keys = ['quality', 'nature', 'water', 'energy', 'recycling', 'pollution', 'approval'];
  keys.forEach((key) => {
    if (delta[key] === undefined) return;
    if (key === 'approval') { state.approval = clamp(state.approval + delta[key]); return; }
    state[key] = clamp(state[key] + delta[key]);
  });
  updateSustainability();
  updateApproval();
  updateStage();
}

function applyPopulationReaction(delta) {
  if (!delta) return;
  if (delta.quality) state.inequality = clamp(state.inequality - delta.quality * 0.25);
  if (delta.pollution > 0) state.inequality = clamp(state.inequality + delta.pollution * 0.15);
  if (delta.quality) state.groups.moradores = clamp(state.groups.moradores + delta.quality * 0.7);
  if (delta.nature || delta.water) state.groups.ambientalistas = clamp(state.groups.ambientalistas + (delta.nature || 0) * 0.4 + (delta.water || 0) * 0.4);
  if (delta.money || delta.quality) state.groups.empresarios = clamp(state.groups.empresarios + (delta.money ? 2 : 0) + (delta.quality ? 1 : 0));
  if (delta.pollution || delta.quality || delta.energy) state.groups.jovens = clamp(state.groups.jovens + (delta.pollution ? delta.pollution * -0.4 : 0) + (delta.quality ? 1.4 : 0) + (delta.energy ? 1.5 : 0));
}

function updateTransport(delta) {
  if (!delta) return;
  if (delta.cars !== undefined) state.transport.cars = clamp(state.transport.cars + delta.cars, 0, 100);
  if (delta.bus !== undefined) state.transport.bus = clamp(state.transport.bus + delta.bus, 0, 100);
  if (delta.bikes !== undefined) state.transport.bikes = clamp(state.transport.bikes + delta.bikes, 0, 100);
  const total = state.transport.cars + state.transport.bus + state.transport.bikes;
  if (total !== 100) {
    const needed = 100 - total;
    const scale = needed > 0 ? (100 / total) : (total / 100);
    state.transport.cars = clamp(Math.round(state.transport.cars * scale), 0, 100);
    state.transport.bus = clamp(Math.round(state.transport.bus * scale), 0, 100);
    state.transport.bikes = clamp(Math.round(state.transport.bikes * scale), 0, 100);
    const finalTotal = state.transport.cars + state.transport.bus + state.transport.bikes;
    if (finalTotal !== 100) {
      const diff = 100 - finalTotal;
      state.transport.cars = clamp(state.transport.cars + diff, 0, 100);
    }
  }
}

function registerAchievement(id) {
  if (state.achievements.includes(id)) return;
  state.achievements.push(id);
  const meta = achievementCatalog.find((item) => item.id === id);
  if (meta) addLog(`🏆 Conquista desbloqueada: ${meta.name}`);
}

function checkAchievements() {
  if (!state.achievements.length && (state.nature > 50 || state.water > 50 || state.quality > 50 || state.recycling > 50)) registerAchievement('first-step');
  if (state.nature >= 90) registerAchievement('guardian-forest');
  if (state.water >= 95) registerAchievement('water-mastery');
  if (state.recycling >= 100) registerAchievement('zero-lixo');
  if (state.energy >= 60 && state.energy > state.pollution) registerAchievement('solar-city');
  if (state.transport.cars <= 20) registerAchievement('car-free');
  if (state.nature >= 80 && state.water >= 80) registerAchievement('frog-egg');
  if (state.coins >= 1000) registerAchievement('green-investor');
  if (state.nature >= 85 && state.water >= 85) registerAchievement('animal-guardian');
  const allHigh = [state.nature, state.water, state.energy, state.recycling, state.quality].every((value) => value >= 90);
  if (allHigh) registerAchievement('ecoprefeito');
}

function checkSecretMissions() {
  secretMissions.forEach((mission) => {
    if (!state.completedMissions.includes(mission.id) && mission.condition()) {
      state.completedMissions.push(mission.id);
      state.coins += mission.reward.coins;
      state.approval = clamp(state.approval + mission.reward.approval);
      addLog(`🎯 Missão Secreta Completa: ${mission.name} +${mission.reward.coins} moedas`);
    }
  });
}

function trackAction(actionId) {
  state.actionsHistory.push({ id: actionId, round: state.round });
  if (state.actionsHistory.length > 20) state.actionsHistory.shift();
}

function checkSecretEventCombos() {
  secretEvents.forEach((secretEvent) => {
    const hasAllActions = secretEvent.combo.every(action =>
      state.actionsHistory.some(h => h.id === action)
    );

    if (hasAllActions && !state.unlockedSecretEvents.includes(secretEvent.name)) {
      state.unlockedSecretEvents.push(secretEvent.name);
      applyDelta(secretEvent.event.delta);
      addLog(`✨ ${secretEvent.name}: ${secretEvent.event.description}`);
    }
  });
}

function generateNews() {
  const news = newsTemplates[Math.floor(Math.random() * newsTemplates.length)](state);
  addLog(news);
}

function recordConsequence(action, delta, roundDelay = 0) {
  state.consequenceChain.push({
    action: action,
    delta: delta,
    initiatedRound: state.round,
    appliedRound: state.round + roundDelay,
  });
}

function saveDecisionSnapshot() {
  const snapshot = JSON.parse(JSON.stringify({ ...state, modal: null, decisionSnapshots: [] }));
  state.decisionSnapshots.push({ round: state.round, state: snapshot });
  if (state.decisionSnapshots.length > 12) state.decisionSnapshots.shift();
}

function restoreDecisionSnapshot() {
  const previous = state.decisionSnapshots[state.decisionSnapshots.length - 1];
  if (!previous) return false;
  Object.keys(previous.state).forEach((key) => { state[key] = previous.state[key]; });
  state.modal = null;
  addLog(`🔮 Você voltou ao ano ${previous.round} para mudar uma decisão-chave.`);
  saveState();
  render();
  return true;
}

function applyConsequenceChain() {
  state.consequenceChain.forEach((consequence) => {
    if (consequence.appliedRound === state.round && !consequence.applied) {
      const roundsAgo = state.round - consequence.initiatedRound;
      addLog(`🌎 Efeito Borboleta: Uma decisão de ${roundsAgo} rodadas atrás continua impactando a cidade.`);
      applyDelta(consequence.delta);
      state.futureImpact += consequence.delta.quality || 0;
      consequence.applied = true;
    }
  });
}

function updateWeather() {
  const weather = weatherSystem[Math.floor(Math.random() * weatherSystem.length)];
  state.currentWeather = weather.type;

  if (weather.effect) {
    Object.entries(weather.effect).forEach(([key, value]) => {
      if (state[key] !== undefined) {
        state[key] = clamp(state[key] + value);
      }
    });
  }

  addLog(`${weather.emoji} Clima: ${weather.name} afetou a cidade`);
  updateSustainability();
  updateApproval();
}

function addLog(text) { state.eventLog.unshift({ round: state.round, text }); if (state.eventLog.length > 14) state.eventLog.pop(); }

function triggerRandomEvent() {
  if (state.currentEvent || state.modal) return;
  const selected = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
  state.currentEvent = { title: selected.title, description: selected.description, choices: selected.choices };
}

function executeAction(action) {
  if (!action) return;
  if (action.cost && state.coins < action.cost) { addLog(`⚠️ Não há moedas suficientes para ${action.title}.`); render(); return; }
  saveDecisionSnapshot();
  if (action.cost) state.coins -= action.cost;
  if (action.money) state.coins += action.money;
  if (action.delta) {
    applyDelta(action.delta);
    applyPopulationReaction(action.delta);
    // Efeito Borboleta: ações têm consequências futuras
    recordConsequence(action.title, { quality: Math.floor(action.delta.quality / 2) || 0 }, 5);
  }
  if (action.transport) updateTransport(action.transport);
  if (action.tech) { if (!state.techs.includes(action.id)) state.techs.push(action.id); }
  generateSocialFeed();
  if (action.pending) {
    state.pendingProjects.push({
      name: action.pending.name,
      delayRemaining: action.pending.delay,
      effect: action.pending.effect,
    });
    addLog(`📅 ${action.title}: ${action.pending.name} em ${action.pending.delay} rodadas`);
  } else {
    addLog(`✅ ${action.title}: ${action.description}`);
  }
  trackAction(action.id);
  checkSecretEventCombos();
  checkAchievements();
  saveState();
  render();
}

function chooseEventOption(choice) {
  if (!state.currentEvent) return;
  if (choice.cost && state.coins < choice.cost) { addLog(`⚠️ Sem saldo para ${choice.text}.`); render(); return; }
  saveDecisionSnapshot();
  if (choice.cost) state.coins -= choice.cost;
  if (choice.delta) { applyDelta(choice.delta); applyPopulationReaction(choice.delta); }
  addLog(`🎲 ${state.currentEvent.title}: ${choice.effectText || choice.text}`);
  state.currentEvent = null;
  checkAchievements();
  saveState();
  render();
}

function calculateFinalScore() {
  const biodiversity = clamp((state.nature + state.water + state.recycling) / 3);
  const crisisPrep = clamp((state.water + state.energy + state.nature + state.quality) / 4);
  const futureLegacy = clamp(50 + state.futureImpact);
  const socialBalance = 100 - state.inequality;
  const score = state.sustainability * 0.3 + state.quality * 0.15 + (state.coins / 40) * 0.1 + state.approval * 0.1 + biodiversity * 0.1 + crisisPrep * 0.05 + socialBalance * 0.1 + futureLegacy * 0.1;
  return Math.round(score);
}

function getFinalClassification(score) {
  if (score >= 95) return { badge: '🌎 Lenda Verde', label: 'Lenda Verde' };
  if (score >= 85) return { badge: '🏆 Prefeito Sustentável', label: 'Prefeito Sustentável' };
  if (score >= 70) return { badge: '🌱 Gestor Verde', label: 'Gestor Verde' };
  if (score >= 50) return { badge: '🏙️ Cidade em Recuperação', label: 'Cidade em Recuperação' };
  if (score >= 30) return { badge: '⚠️ Prefeito Problemático', label: 'Prefeito Problemático' };
  return { badge: '☠️ EcoApocalipse', label: 'EcoApocalipse' };
}

function showFinalReport() {
  const score = calculateFinalScore();
  const classification = getFinalClassification(score);
  const biodiversity = clamp((state.nature + state.water + state.recycling) / 3);
  const finalText = score >= 80
    ? 'Você criou uma cidade que prosperou sem comprometer o futuro.'
    : state.coins >= 900
      ? 'Você criou uma cidade rica, mas quase impossível de viver.'
      : 'Você criou uma cidade sustentável, porém economicamente frágil.';
  state.modal = {
    type: 'report',
    score,
    classification,
    biodiversity,
    finalText,
  };
  saveRanking();
  renderModal();
}

function showFutureMoment() {
  const futureYear = state.round >= 50 ? 2056 : 2026 + state.round;
  const climateText = state.nature >= 70 && state.pollution < 45
    ? 'As árvores cresceram, o ar melhorou e os bairros ficaram mais frescos.'
    : 'O calor e a poluição cobram o preço de escolhas que pareciam pequenas no início.';
  state.modal = {
    type: 'future',
    futureYear,
    final: state.round >= 50,
    citizenText: `Prefeito, eu moro aqui em ${futureYear}. Quero te mostrar como a cidade ficou.`,
    consequence: climateText,
  };
  renderModal();
}

function showElectionModal() {
  const reelected = state.approval >= 60 && state.sustainability >= 50;
  state.modal = {
    type: 'election',
    reelected,
    approval: state.approval,
    nature: state.nature,
    water: state.water,
    energy: state.energy,
    recycling: state.recycling,
    quality: state.quality,
  };
  renderModal();
}

function closeModal() {
  state.modal = null;
  const overlay = document.getElementById('reportOverlay');
  if (overlay) overlay.classList.add('hidden');
}

function renderModal() {
  const overlay = document.getElementById('reportOverlay');
  if (!state.modal) {
    overlay.classList.add('hidden');
    return;
  }

  overlay.classList.remove('hidden');

  if (state.modal.type === 'environmental-report') {
    const report = state.modal.report;
    overlay.innerHTML = `
      <div class="report-panel">
        <div class="modal-header">📊 INVESTIGAÇÃO AMBIENTAL</div>
        <div class="environmental-grid">
          <div class="env-item">
            <span>🌳 Saúde Florestal</span>
            <strong>${report.forestHealth}</strong>
            <small>Natureza: ${state.nature}</small>
          </div>
          <div class="env-item">
            <span>💧 Qualidade da Água</span>
            <strong>${report.waterQuality}</strong>
            <small>Água: ${state.water}</small>
          </div>
          <div class="env-item">
            <span>⚡ Energia Limpa</span>
            <strong>${report.cleanEnergy}</strong>
            <small>Energia: ${state.energy}%</small>
          </div>
          <div class="env-item">
            <span>🌫️ Qualidade do Ar</span>
            <strong>${report.airQuality}</strong>
            <small>Poluição: ${state.pollution}</small>
          </div>
          <div class="env-item">
            <span>🐢 Biodiversidade</span>
            <strong>${report.biodiversity}</strong>
            <small>Indicador: ${Math.round((state.nature + state.water) / 2)}</small>
          </div>
        </div>
        <div class="modal-actions">
          <button id="closeReportBtn" class="primary-btn">Fechar análise</button>
        </div>
      </div>
    `;
    document.getElementById('closeReportBtn').addEventListener('click', () => closeModal());
    return;
  }

  if (state.modal.type === 'map-diagnosis') {
    const diagnosis = state.modal.diagnosis;
    overlay.innerHTML = `
      <div class="report-panel diagnosis-panel">
        <div class="modal-header">🔍 DIAGNÓSTICO DA CIDADE</div>
        <h2>${diagnosis.title}</h2>
        <div class="diagnosis-score"><strong>${Math.round(diagnosis.value)}%</strong><span>situação atual</span></div>
        <p class="diagnosis-cause"><strong>Por que isso acontece?</strong><br>${diagnosis.cause}</p>
        <div class="cause-tree"><span>⚠ Problema identificado</span><i></i><strong>${diagnosis.title}</strong><i></i><small>Escolha uma solução no painel de ações</small></div>
        <h3>💡 Três caminhos possíveis</h3>
        <div class="solution-list">${diagnosis.solutions.map((solution, index) => `<div><b>${index + 1}</b><span>${solution}</span></div>`).join('')}</div>
        <div class="modal-actions"><button id="closeDiagnosisBtn" class="primary-btn">Voltar ao mapa</button></div>
      </div>
    `;
    document.getElementById('closeDiagnosisBtn').addEventListener('click', closeModal);
    return;
  }

  if (state.modal.type === 'election') {
    const reelected = state.modal.reelected;
    overlay.innerHTML = `
      <div class="report-panel election-panel">
        <div class="modal-header">🗳️ ELEIÇÕES MUNICIPAIS</div>
        <div class="metrics-grid">
          <div><span>🌳 Natureza</span><strong>${state.modal.nature}</strong></div>
          <div><span>💧 Água</span><strong>${state.modal.water}</strong></div>
          <div><span>⚡ Energia</span><strong>${state.modal.energy}</strong></div>
          <div><span>♻️ Reciclagem</span><strong>${state.modal.recycling}</strong></div>
          <div><span>😊 Qualidade</span><strong>${state.modal.quality}</strong></div>
          <div><span>❤️ Aprovação</span><strong>${state.modal.approval}%</strong></div>
        </div>
        <div class="approval-bar">
          <span>Resultado</span>
          <div class="bar"><div style="width: ${state.modal.approval}%;"></div></div>
        </div>
        <h3>${reelected ? '🎉 VOCÊ FOI REELEITO!' : '❌ VOCÊ PERDEU A ELEIÇÃO'}</h3>
        <p>${reelected ? 'Seu trabalho está transformando a cidade.' : 'A população decidiu escolher uma nova liderança.'}</p>
        <div class="modal-actions">
          <button id="continueElectionBtn" class="primary-btn">Continuar</button>
        </div>
      </div>
    `;
    document.getElementById('continueElectionBtn').addEventListener('click', () => { closeModal(); state.currentEvent = null; });
    return;
  }

  if (state.modal.type === 'future') {
    overlay.innerHTML = `
      <div class="report-panel future-panel">
        <div class="future-year">${state.modal.futureYear}</div>
        <div class="future-citizen">👧</div>
        <h2>Uma mensagem do futuro</h2>
        <blockquote>"${state.modal.citizenText}"</blockquote>
        <p class="future-consequence">${state.modal.consequence}</p>
        <div class="future-signals">
          <span>🌱 ${state.nature}% ambiente</span>
          <span>😊 ${state.quality}% qualidade</span>
          <span>🌫️ ${state.pollution}% poluição</span>
        </div>
        <div class="modal-actions">
          ${state.modal.final ? '<button id="futureLegacyBtn" class="primary-btn">Ver Índice de Legado</button>' : '<button id="futureContinueBtn" class="primary-btn">Continuar a governar</button>'}
          ${state.decisionSnapshots.length ? '<button id="futureReturnBtn" class="secondary-btn">↩ Voltar à última decisão</button>' : ''}
        </div>
      </div>
    `;
    const continueButton = document.getElementById('futureContinueBtn');
    if (continueButton) continueButton.addEventListener('click', closeModal);
    const legacyButton = document.getElementById('futureLegacyBtn');
    if (legacyButton) legacyButton.addEventListener('click', showFinalReport);
    const returnButton = document.getElementById('futureReturnBtn');
    if (returnButton) returnButton.addEventListener('click', restoreDecisionSnapshot);
    return;
  }

  const score = state.modal.score;
  const classification = state.modal.classification;
  const biodiversity = state.modal.biodiversity;
  overlay.innerHTML = `
    <div class="report-panel">
      <div class="report-top">
        <h2>🌎 ECOQUEST — RESULTADO</h2>
        <div class="title-badge">${classification.badge}</div>
      </div>
      <div class="final-score">🔮 Índice de Legado: ${score} / 100</div>
      <div class="metrics-grid report-grid">
        <div><span>🌳 Natureza</span><strong>${state.nature}</strong></div>
        <div><span>💧 Água</span><strong>${state.water}</strong></div>
        <div><span>⚡ Energia</span><strong>${state.energy}</strong></div>
        <div><span>♻️ Reciclagem</span><strong>${state.recycling}</strong></div>
        <div><span>😊 Qualidade</span><strong>${state.quality}</strong></div>
        <div><span>🪙 Economia</span><strong>${state.coins}</strong></div>
      </div>
      <div class="report-summary">
        <div><span>❤️ Aprovação</span><strong>${state.approval}%</strong></div>
        <div><span>🏠 Equilíbrio social</span><strong>${100 - state.inequality}%</strong></div>
        <div><span>🔮 Futuro</span><strong>${clamp(50 + state.futureImpact)}%</strong></div>
        <div><span>🐢 Animais salvos</span><strong>${Math.round(biodiversity / 10)}</strong></div>
        <div><span>🌳 Árvores</span><strong>${state.nature * 5}</strong></div>
        <div><span>🏆 Conquistas</span><strong>${state.achievements.length}/10</strong></div>
      </div>
      <blockquote>"${state.modal.finalText}"</blockquote>
      <div class="modal-actions">
        <button id="reportAgainBtn" class="primary-btn">🔄 Jogar novamente</button>
        <button id="reportInfiniteBtn" class="secondary-btn">♾️ Modo Infinito</button>
        <button id="reportMenuBtn" class="danger-btn">🏠 Menu</button>
      </div>
    </div>
  `;

  document.getElementById('reportAgainBtn').addEventListener('click', () => {
    const fresh = createInitialState();
    Object.assign(state, fresh);
    closeModal();
    saveState();
    render();
  });

  document.getElementById('reportInfiniteBtn').addEventListener('click', () => {
    state.infiniteMode = true;
    state.modal = null;
    closeModal();
    addLog('♾️ Modo Infinito ativado. A cidade nunca para.');
    saveState();
    render();
  });

  document.getElementById('reportMenuBtn').addEventListener('click', () => {
    const fresh = createInitialState();
    Object.assign(state, fresh);
    closeModal();
    saveState();
    render();
  });
}

function resolvePendingProjects() {
  if (!state.pendingProjects || state.pendingProjects.length === 0) return;
  state.pendingProjects = state.pendingProjects.filter((project) => {
    project.delayRemaining -= 1;
    if (project.delayRemaining <= 0) {
      if (project.effect) {
        applyDelta(project.effect);
        if (project.effect.money) state.coins += project.effect.money;
        addLog(`✅ ${project.name}`);
      }
      return false;
    }
    return true;
  });
}

function collectTaxes() {
  const income = calculateTaxIncome();
  state.coins += income;
  state.taxIncomeTotal += income;
  state.lastTaxCollection = income;
  addLog(`💰 Impostos recolhidos automaticamente: +${income} moedas`);
}

function calculateTaxIncome(rate = state.taxRate) {
  const efficiency = 0.65 + (state.quality / 200);
  return Math.max(0, Math.round((state.population / 1000) * rate * efficiency));
}

function nextRound() {
  if (state.modal) return;
  state.round += 1;
  resolvePendingProjects();
  updateWeather();
  applyConsequenceChain();
  if (state.round % 2 === 0) generateNews();
  triggerRandomEvent();
  updateSustainability();
  updateApproval();
  updateStage();
  checkSecretMissions();
  const populationImpact = state.quality >= 70 ? 1500 : state.quality >= 50 ? 700 : -1200;
  state.population = clamp(Math.round(state.population + populationImpact), 20000, 120000);
  collectTaxes();
  if (state.round % 4 === 0) addLog('🌦️ Nova crise climática: a cidade precisa estar preparada para resistir.');
  generateSocialFeed();
  recordTimeline();
  if (!state.infiniteMode && [10, 20, 50].includes(state.round)) {
    showFutureMoment();
  } else if (!state.infiniteMode && state.round % 10 === 0 && state.round !== state.lastElectionRound) {
    state.lastElectionRound = state.round;
    showElectionModal();
  }
  if (state.infiniteMode && state.round >= 40) {
    const crisisLevel = state.round > 80 ? '☠️ EcoApocalipse' : state.round > 50 ? '🔴 Crítico' : state.round > 25 ? '🟠 Difícil' : '🟡 Normal';
    addLog(`♾️ Nível de dificuldade: ${crisisLevel}`);
  }
  checkAchievements();
  saveState();
  render();
}

function renderStats() {
  const sustStat = document.getElementById('sustStat');
  const coinsStat = document.getElementById('coinsStat');
  const approvalStat = document.getElementById('approvalStat');
  const roundLabel = document.getElementById('roundLabel');
  const populationLabel = document.getElementById('populationLabel');
  const lifeQualityLabel = document.getElementById('lifeQualityLabel');
  const campaignPhaseLabel = document.getElementById('campaignPhaseLabel');
  const natureBar = document.getElementById('natureBar');
  const waterBar = document.getElementById('waterBar');
  const energyBar = document.getElementById('energyBar');
  const recycleBar = document.getElementById('recycleBar');
  const pollutionBar = document.getElementById('pollutionBar');
  const stageBadge = document.getElementById('stageBadge');
  const phaseBanner = document.getElementById('phaseBanner');

  if (sustStat) sustStat.textContent = state.sustainability;
  if (coinsStat) coinsStat.textContent = state.coins;
  if (approvalStat) approvalStat.textContent = `${state.approval}%`;
  if (roundLabel) roundLabel.textContent = state.round;
  if (populationLabel) populationLabel.textContent = new Intl.NumberFormat('pt-BR').format(state.population);
  if (lifeQualityLabel) lifeQualityLabel.textContent = state.quality;
  if (campaignPhaseLabel) campaignPhaseLabel.textContent = getCampaignPhase().name;
  if (natureBar) natureBar.style.width = `${state.nature}%`;
  if (waterBar) waterBar.style.width = `${state.water}%`;
  if (energyBar) energyBar.style.width = `${state.energy}%`;
  if (recycleBar) recycleBar.style.width = `${state.recycling}%`;
  if (pollutionBar) pollutionBar.style.width = `${state.pollution}%`;

  const stage = getStageData(state.cityStage);
  if (stageBadge) {
    stageBadge.textContent = stage.title;
    stageBadge.className = `badge ${stage.badge}`;
  }

  if (phaseBanner) {
    const phase = getCampaignPhase();
    const weather = weatherSystem.find(w => w.type === state.currentWeather) || weatherSystem[0];
    phaseBanner.innerHTML = `<strong>${phase.name} — ${phase.title}</strong><span>${phase.goal} | ${weather.emoji} ${weather.name}</span>`;
  }

  renderCityScene();
  renderCityMap();
}

function renderCityScene() {
  const scene = document.getElementById('cityScene');
  const s = state;
  const buildings = Array.from({ length: 7 }, (_, index) => `<div class="building" style="height:${40 + index * 16}px"></div>`).join('');
  const trees = Array.from({ length: 6 }, (_, index) => `<div class="tree" style="margin-left:${index * 6}px"></div>`).join('');
  const cars = ['🚗', '🚗', '🚲', '🚌', '🚲'].map((car, index) => `<span class="car" style="animation-delay:${index * 0.5}s">${car}</span>`).join('');
  const fauna = ['🐢', '🦋', '🐸'].map((animal, index) => `<span style="left:${18 + index * 28}%">${animal}</span>`).join('');
  const crisisMode = s.pollution > 70 || s.water < 35 || s.energy < 35 ? 'crisis' : '';
  scene.innerHTML = `
    <div class="city-scene ${crisisMode}">
      <div class="sky-layer"></div>
      <div class="cloud-layer"><span>☁️</span><span>☁️</span><span>☁️</span></div>
      <div class="sun-layer" style="opacity:${s.energy > 60 ? 1 : 0.3};"></div>
      <div class="river-layer" style="opacity:${s.water > 40 ? 1 : 0.25};"></div>
      <div class="building-layer">${buildings}</div>
      <div class="tree-layer">${trees}</div>
      <div class="car-layer">${cars}</div>
      ${s.pollution > 60 ? '<div class="smoke-layer"><span>💨</span><span>💨</span><span>💨</span></div>' : ''}
      ${s.nature > 70 ? `<div class="animals-layer">${fauna}</div>` : ''}
      <div class="ground-layer"></div>
    </div>
  `;
}

function renderCityMap() {
  const map = document.getElementById('cityMap');
  if (!map) return;
  const s = state;
  const futureMode = futureMapMode;
  const diagnosisMode = diagnosisMapMode;
  const projectedNature = clamp(s.nature + (s.nature - s.pollution) * 0.12);
  const projectedPollution = clamp(s.pollution + (s.pollution - s.nature) * 0.12);
  const projectedWater = clamp(s.water + (s.water - s.pollution) * 0.1);
  const nature = futureMode ? projectedNature : s.nature;
  const pollution = futureMode ? projectedPollution : s.pollution;
  const water = futureMode ? projectedWater : s.water;
  const parkCount = Math.max(1, Math.min(4, Math.round(nature / 25)));
  const parkPositions = [[12, 24], [36, 68], [70, 18], [80, 70]];
  const parks = parkPositions.slice(0, parkCount)
    .map(([left, top], index) => `<span class="map-marker park-marker" tabindex="0" style="left:${left}%;top:${top}%" title="Parque ${index + 1}: Natureza ${Math.round(nature)}%" aria-label="Parque ${index + 1}, Natureza ${Math.round(nature)}%"><b>Parque ${index + 1}</b><small>${Math.round(nature)}% verde</small></span>`)
    .join('');
  const transportIcon = s.transport.bikes >= s.transport.cars ? '🚲' : s.transport.bus >= s.transport.cars ? '🚌' : '🚗';
  const mapMood = pollution > 70 || water < 35 ? ' map-crisis' : nature > 70 && pollution < 40 ? ' map-thriving' : '';
  const diagnosisClass = diagnosisMode ? ' map-diagnosis' : '';
  const alert = s.currentEvent
    ? `<span class="map-alert">⚠ ${s.currentEvent.title.replace(/^[^A-Za-zÀ-ÿ]+/u, '')}</span>`
    : pollution > 65 ? '<span class="map-alert">⚠ Qualidade do ar em risco</span>' : water < 40 ? '<span class="map-alert">⚠ Abastecimento sob pressão</span>' : '<span class="map-alert stable">● Cidade estável</span>';
  map.innerHTML = `
    <div class="map-grid map-zoom-${mapZoom}${mapMood}${futureMode ? ' map-future' : ''}${diagnosisClass}">
      <div class="map-topline"><b>${futureMode ? 'PREVISÃO · +10 ANOS' : 'VERDÁPOLIS'}</b>${alert}</div>
      <div class="map-river" aria-hidden="true"></div>
      <div class="map-road road-one" aria-hidden="true"></div>
      <div class="map-road road-two" aria-hidden="true"></div>
      <div class="map-block block-one" aria-hidden="true"></div><div class="map-block block-two" aria-hidden="true"></div><div class="map-block block-three" aria-hidden="true"></div>
      <div class="map-district district-north"><span>Zona Norte</span><small>Residencial</small></div>
      <div class="map-district district-center"><span>Centro</span><small>Comércio e serviços</small></div>
      <div class="map-district district-south"><span>Zona Sul</span><small>Produção local</small></div>
      ${renderMapMarker('center-marker', 'quality', '🏙️', 'Centro', s.quality, s.quality < 65)}
      ${renderMapMarker('water-marker', 'water', '💧', 'Rio Azul', water, water < 65)}
      ${renderMapMarker('energy-marker', 'energy', '⚡', 'Usina', s.energy, s.energy < 65)}
      ${renderMapMarker('mobility-marker', 'mobility', transportIcon, 'Terminal', 100 - s.transport.cars, s.transport.cars > 50)}
      ${renderMapMarker('recycle-marker', 'recycling', '♻️', 'Coleta', s.recycling, s.recycling < 65)}
      ${parks}
    </div>
  `;
  map.setAttribute('aria-label', `${futureMode ? 'Previsão da cidade em 10 anos' : 'Mapa atual da cidade'}: ${parkCount} áreas verdes, água em ${Math.round(water)} por cento, poluição em ${Math.round(pollution)} por cento.`);
  const futureButton = document.getElementById('futureMapBtn');
  if (futureButton) {
    futureButton.textContent = futureMode ? '↩ Atual' : '🔮 Futuro';
    futureButton.classList.toggle('active', futureMode);
    futureButton.onclick = () => { futureMapMode = !futureMapMode; renderCityMap(); };
  }
  const diagnosisButton = document.getElementById('diagnosisMapBtn');
  if (diagnosisButton) {
    diagnosisButton.textContent = diagnosisMode ? '↩ Mapa' : '🔍 Diagnóstico';
    diagnosisButton.classList.toggle('active', diagnosisMode);
    diagnosisButton.onclick = () => { diagnosisMapMode = !diagnosisMapMode; renderCityMap(); };
  }
  const expandButton = document.getElementById('expandMapBtn');
  const mapSection = document.querySelector('.map-section');
  if (expandButton && mapSection) {
    expandButton.textContent = expandedMapMode ? '↙ Voltar' : '↗ Expandir';
    expandButton.classList.toggle('active', expandedMapMode);
    mapSection.classList.toggle('map-expanded', expandedMapMode);
    expandButton.onclick = () => { expandedMapMode = !expandedMapMode; renderCityMap(); };
  }
  document.querySelectorAll('.zoom-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.mapZoom === mapZoom);
    button.onclick = () => { mapZoom = button.dataset.mapZoom; renderCityMap(); };
  });
  map.querySelectorAll('.map-diagnosis-marker').forEach((marker) => {
    marker.addEventListener('click', () => showMapDiagnosis(marker.dataset.diagnosis));
    marker.addEventListener('click', () => { selectedMapRegion = marker.dataset.diagnosis; renderMapInspector(); });
    marker.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') showMapDiagnosis(marker.dataset.diagnosis); });
  });
  renderMapInspector();
}

function renderMapInspector() {
  const inspector = document.getElementById('mapInspector');
  if (!inspector) return;
  if (!selectedMapRegion) {
    inspector.innerHTML = '<span class="inspector-empty">Selecione uma região para ver seus sinais e caminhos de melhoria.</span>';
    return;
  }
  const diagnosis = getMapDiagnosis(selectedMapRegion);
  inspector.innerHTML = `<div class="inspector-heading"><strong>${diagnosis.title}</strong><span>${Math.round(diagnosis.value)}%</span></div><p>${diagnosis.cause}</p><div class="inspector-solutions">${diagnosis.solutions.map((solution) => `<span>💡 ${solution}</span>`).join('')}</div>`;
}

function renderMapMarker(markerClass, diagnosisType, icon, label, value, hasSuggestion) {
  const status = getDiagnosisStatus(value);
  const suggestion = hasSuggestion ? '<em aria-hidden="true">💡</em>' : '';
  const statusLabel = { good: 'excelente', normal: 'normal', warn: 'atenção', bad: 'crítico' }[status];
  return `<button class="map-marker ${markerClass} map-diagnosis-marker status-${status}" data-diagnosis="${diagnosisType}" type="button" style="left:${{ quality: 44, water: 60, energy: 78, mobility: 18, recycling: 58 }[diagnosisType]}%;top:${{ quality: 37, water: 8, energy: 43, mobility: 68, recycling: 75 }[diagnosisType]}%" title="${label}: ${Math.round(value)}%, estado ${statusLabel}" aria-label="${label}, ${Math.round(value)}%, estado ${statusLabel}${hasSuggestion ? ', há uma sugestão' : ''}"><span class="status-icon" aria-hidden="true">${status === 'good' ? '✓' : status === 'normal' ? '•' : status === 'warn' ? '!' : '×'}</span><strong>${icon}</strong><b>${label}</b><small>${Math.round(value)}%</small>${suggestion}</button>`;
}

function getDiagnosisStatus(value) {
  if (value >= 80) return 'good';
  if (value >= 65) return 'normal';
  if (value >= 35) return 'warn';
  return 'bad';
}

function getDiagnosisClass(value) {
  if (value < 35) return 'diagnosis-bad';
  if (value < 65) return 'diagnosis-warn';
  return 'diagnosis-good';
}

function showMapDiagnosis(type) {
  const diagnosis = getMapDiagnosis(type);
  if (!diagnosis) return;
  state.modal = { type: 'map-diagnosis', diagnosis };
  renderModal();
}

function getMapDiagnosis(type) {
  const diagnoses = {
    quality: { title: 'Centro · Qualidade de vida', value: state.quality, cause: 'Serviços públicos e moradia ainda não acompanham o crescimento.', solutions: ['Reformar bairros', 'Criar parques de bairro', 'Melhorar transporte público'] },
    water: { title: 'Rio Azul · Água', value: state.water, cause: 'O abastecimento está pressionado por desperdício e poluição.', solutions: ['Instalar sensores de água', 'Construir tratamento', 'Proteger as margens do rio'] },
    energy: { title: 'Usina solar · Energia limpa', value: state.energy, cause: 'A cidade ainda depende de fontes convencionais em parte do consumo.', solutions: ['Investir em painéis solares', 'Criar baterias urbanas', 'Expandir a micro-rede'] },
    mobility: { title: 'Terminal · Mobilidade', value: 100 - state.transport.cars, cause: 'Muitos moradores ainda dependem de carros particulares.', solutions: ['Construir ciclovias', 'Expandir metrô', 'Criar ônibus elétricos'] },
    recycling: { title: 'Cooperativa · Reciclagem', value: state.recycling, cause: 'A coleta seletiva ainda não alcança todos os bairros.', solutions: ['Ampliar cooperativa', 'Automatizar reciclagem', 'Criar compostagem'] },
  };
  return diagnoses[type];
}

function renderEvent() {
  const eventBox = document.getElementById('eventBox');
  if (!state.currentEvent) { eventBox.innerHTML = '<p>Sem evento nesta rodada. A cidade está analisando as próximas escolhas.</p>'; return; }
  const { title, description, choices } = state.currentEvent;
  eventBox.innerHTML = `
    <h4>${title}</h4>
    <p>${description}</p>
    <div class="choice-list">
      ${choices.map((choice, index) => `
        <button class="choice-btn" data-choice-index="${index}">
          ${choice.text}
          ${choice.cost ? `<small>-${choice.cost} moedas</small>` : ''}
          ${choice.delta ? `<small>${formatDelta(choice.delta)}</small>` : ''}
        </button>
      `).join('')}
    </div>
  `;
  eventBox.querySelectorAll('.choice-btn').forEach((button) => {
    button.addEventListener('click', () => chooseEventOption(choices[Number(button.dataset.choiceIndex)]));
  });
}

function formatDelta(delta) {
  const items = [];
  if (delta.nature) items.push(`${delta.nature > 0 ? '+' : ''}${delta.nature} Natureza`);
  if (delta.water) items.push(`${delta.water > 0 ? '+' : ''}${delta.water} Água`);
  if (delta.energy) items.push(`${delta.energy > 0 ? '+' : ''}${delta.energy} Energia`);
  if (delta.recycling) items.push(`${delta.recycling > 0 ? '+' : ''}${delta.recycling} Reciclagem`);
  if (delta.quality) items.push(`${delta.quality > 0 ? '+' : ''}${delta.quality} Qualidade`);
  if (delta.pollution) items.push(`${delta.pollution > 0 ? '+' : ''}${delta.pollution} Poluição`);
  return items.join(' • ');
}

function renderLogs() {
  const list = document.getElementById('logList');
  list.innerHTML = state.eventLog.slice(0, 10).map((entry) => `<li><strong>R${entry.round}:</strong> ${entry.text}</li>`).join('');
}

function renderActionButtons() {
  Object.entries(actionCatalog).forEach(([key, actions]) => {
    const container = document.getElementById({ cidade: 'cityActions', laboratorio: 'labActions', mobilidade: 'mobilityActions', reciclagem: 'recyclingActions', animais: 'animalActions', banco: 'bankActions' }[key]);
    if (!container) return;
    if (key === 'banco') {
      container.innerHTML = actions.map((action) => `
        <button class="action-btn" data-action-id="${action.id}" data-category="${key}">
          <h4>${action.title}</h4>
          <p>${action.description}</p>
          <small>${action.tags}</small>
          <div class="action-meta"><span>Investe: ${action.cost} moedas</span><span>Recebe: ${getActionReturn(action)}</span></div>
          <small class="profit-label">Lucro líquido: +${getActionReturn(action) - action.cost} moedas</small>
        </button>
      `).join('');
    } else {
      container.innerHTML = actions.map((action) => `
        <button class="action-btn" data-action-id="${action.id}" data-category="${key}">
          <h4>${action.title}</h4>
          <p>${action.description}</p>
          <small>${action.tags}</small>
          <div class="action-meta"><span>${action.cost ? `- ${action.cost} moedas` : 'Sem custo'}</span><span>${action.money ? `+ ${action.money} moedas` : formatDelta(action.delta)}</span></div>
        </button>
      `).join('');
    }
  });
  document.querySelectorAll('.action-btn').forEach((button) => {
    const category = button.dataset.category;
    const action = actionCatalog[category].find((item) => item.id === button.dataset.actionId);
    button.addEventListener('click', () => executeAction(action));
  });

  // Renderizar painéis especiais de Sprint 3
  renderReferendumPanel();
  renderInvestigacaoPanel();
  renderLawsPanel();
}

function getActionReturn(action) {
  return (action.money || 0) + (action.pending?.effect?.money || 0);
}

// 🗳️ Renderizar painel de Referendo
function renderReferendumPanel() {
  const container = document.getElementById('referendumPanel');
  if (!container) return;
  container.innerHTML = `
    <div class="sprint3-info">
      <p>💬 Aprove referendos para mudanças estruturais na cidade!</p>
      <small>Custo em moedas | Aprovação depende da aprovação municipal (${state.approval}%)</small>
    </div>
    ${referendumProposals.map((proposal) => {
      const passed = state.passedReferendums.includes(proposal.id);
      const canAfford = state.coins >= proposal.cost;
      const willPass = state.approval > 60;
      return `
        <button class="action-btn ${passed ? 'disabled' : ''} ${!canAfford ? 'disabled' : ''}" ${passed ? 'disabled' : ''} onclick="initiateReferendum('${proposal.id}')">
          <h4>${passed ? '✅' : '🗳️'} ${proposal.title}</h4>
          <p>${proposal.description}</p>
          <div class="action-meta">
            <span>Custo: ${proposal.cost} moedas</span>
            <span>${willPass ? '✅ Será aprovado' : '❌ Será rejeitado'}</span>
          </div>
        </button>
      `;
    }).join('')}
  `;
}

// 📊 Renderizar painel de Investigação Ambiental
function renderInvestigacaoPanel() {
  const container = document.getElementById('investigacaoPanel');
  if (!container) return;
  container.innerHTML = `
    <div class="sprint3-info">
      <p>📊 Analise o estado ambiental da cidade!</p>
      <small>Disponível a cada 3 rodadas | Última análise: Rodada ${state.lastAnalysisRound}</small>
    </div>
    <button class="action-btn primary-btn" onclick="generateEnvironmentalReport()">
      <h4>📊 Gerar Relatório Ambiental</h4>
      <p>Analise profunda dos indicadores de saúde ambiental da cidade</p>
      <div class="action-meta">
        <span>Próxima disponível: Rodada ${state.lastAnalysisRound + 3}</span>
        <span>${state.round - state.lastAnalysisRound >= 3 ? '✅ Disponível' : '⏳ Em espera'}</span>
      </div>
    </button>
    <button class="action-btn" onclick="addLog('🕰️ Visualizando histórico da cidade: ' + state.timelineHistory.map(t => t.snapshot).join(' | '))">
      <h4>🕰️ Máquina do Tempo</h4>
      <p>Veja como a cidade evoluiu ao longo das rodadas</p>
      <small>Total de rodadas: ${state.timelineHistory.length}</small>
    </button>
  `;
}

// 📜 Renderizar painel de Leis
function renderLawsPanel() {
  const container = document.getElementById('leisPanel');
  if (!container) return;
  container.innerHTML = `
    <div class="sprint3-info">
      <p>📜 Proponha e vote em leis para a cidade!</p>
      <small>Leis já aprovadas: ${state.passedLaws.length} | Taxa de aprovação: ${state.approval}%</small>
    </div>
    <div class="sprint3-info tax-info">
      <p>💰 Impostos automáticos</p>
      <small>Taxa atual: ${state.taxRate}% | Próxima coleta: +${calculateTaxIncome()} moedas | Total arrecadado: ${state.taxIncomeTotal}</small>
      ${taxUpgrades.map((upgrade, index) => {
        const unlocked = index < state.taxLevel;
        const available = index === state.taxLevel;
        const nextIncome = calculateTaxIncome(state.taxRate + upgrade.rateBonus);
        const incomeIncrease = nextIncome - calculateTaxIncome();
        return `<button class="action-btn ${unlocked ? 'disabled' : ''} ${!available || state.coins < upgrade.cost ? 'disabled' : ''}" ${!available || state.coins < upgrade.cost ? 'disabled' : ''} onclick="upgradeTaxes('${upgrade.id}')">
          <h4>${unlocked ? '✅' : available ? '⬆️' : '🔒'} ${upgrade.name}</h4>
          <p>${upgrade.description}</p>
          <div class="action-meta"><span>${unlocked ? 'Concluído' : `Custo: ${upgrade.cost} moedas`}</span><span>${unlocked ? `Taxa +${upgrade.rateBonus}%` : `+${incomeIncrease}/rodada`}</span></div>
        </button>`;
      }).join('')}
    </div>
    ${lawCatalog.map((law) => {
      const passed = state.passedLaws.includes(law.id);
      const voteScore = Math.round(state.approval * 0.9 + state.groups.ambientalistas * 0.1);
      const willPass = voteScore > 70;
      return `
        <button class="action-btn ${passed ? 'disabled' : ''}" ${passed ? 'disabled' : ''} onclick="proposeLaw('${law.id}')">
          <h4>${passed ? '✅ Lei aprovada' : '📜'} ${law.name}</h4>
          <p>${law.description}</p>
          <div class="action-meta">
            <span>Impacto: ${formatDelta(law.effect)}</span>
            <span>${willPass ? `✅ ${voteScore}% de apoio` : `❌ ${voteScore}% de apoio`}</span>
          </div>
        </button>
      `;
    }).join('')}
  `;
}

function upgradeTaxes(upgradeId) {
  const upgradeIndex = taxUpgrades.findIndex((upgrade) => upgrade.id === upgradeId);
  const upgrade = taxUpgrades[upgradeIndex];
  if (!upgrade || upgradeIndex !== state.taxLevel) return;
  if (state.coins < upgrade.cost) {
    addLog(`⚠️ Faltam moedas para ${upgrade.name}.`);
    return;
  }
  state.coins -= upgrade.cost;
  state.taxRate += upgrade.rateBonus;
  state.taxLevel += 1;
  state.approval = clamp(state.approval + upgrade.approval);
  const firstCollectionBonus = calculateTaxIncome() - calculateTaxIncome(state.taxRate - upgrade.rateBonus);
  state.coins += firstCollectionBonus;
  state.taxIncomeTotal += firstCollectionBonus;
  state.lastTaxCollection = firstCollectionBonus;
  addLog(`🏛️ Upgrade fiscal concluído: ${upgrade.name}. +${firstCollectionBonus} moedas de retorno imediato.`);
  saveState();
  render();
}

function renderAchievements() {
  const container = document.getElementById('achievementPanel');
  container.innerHTML = achievementCatalog.map((achievement) => `
    <div class="achievement-item ${state.achievements.includes(achievement.id) ? 'unlocked' : ''}">
      <h4>${achievement.name}</h4>
      <p>${achievement.description}</p>
    </div>
  `).join('');
}

function generateSocialFeed() {
  const templates = [
    { user: 'Moradora', text: 'A cidade está mais bonita e mais segura.', mood: 'positivo' },
    { user: 'Jovem', text: 'O futuro da cidade depende de energia limpa e mobilidade ativa.', mood: 'positivo' },
    { user: 'Ambientalista', text: 'Precisamos de mais árvores e menos poluição.', mood: 'neutro' },
    { user: 'Empresário', text: 'A renda cresce quando a cidade pensa no longo prazo.', mood: 'positivo' },
    { user: 'Cidadão', text: 'O transporte público está melhorando, mas ainda precisa de mais apoio.', mood: 'neutro' },
    { user: 'Estudante', text: 'As decisões de hoje vão definir o futuro da nossa geração.', mood: 'positivo' },
  ];

  const selected = templates
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((item) => ({
      user: item.user,
      text: item.text,
      mood: item.mood,
    }));

  state.socialFeed = selected;
}

// ========== SPRINT 3: FUNÇÕES DAS NOVAS FEATURES ==========

// 🗳️ SISTEMA DE REFERENDO
function initiateReferendum(proposalId) {
  const proposal = referendumProposals.find((p) => p.id === proposalId);
  if (!proposal) return;
  if (state.coins < proposal.cost) {
    addLog(`⚠️ Falta moedas para referendo ${proposal.title}`);
    return;
  }
  state.coins -= proposal.cost;
  const votePercentage = state.approval;
  if (votePercentage > 60) {
    applyDelta(proposal.effect);
    state.passedReferendums.push(proposal.id);
    addLog(`🗳️ ✅ REFERENDO APROVADO: ${proposal.title}`);
  } else {
    addLog(`🗳️ ❌ Referendo rejeitado: ${proposal.title}`);
  }
  saveState();
  render();
}

// 🕰️ MÁQUINA DO TEMPO - Registrar histórico
function recordTimeline() {
  state.timelineHistory.push({
    round: state.round,
    snapshot: `Rodada ${state.round}: Sustentabilidade ${state.sustainability} | Aprovação ${state.approval}%`,
  });
}

// 🕵️ INVESTIGAÇÃO AMBIENTAL
function generateEnvironmentalReport() {
  if (state.round - state.lastAnalysisRound < 3) {
    addLog(`📊 Próxima análise disponível em ${3 - (state.round - state.lastAnalysisRound)} rodadas.`);
    return;
  }
  state.lastAnalysisRound = state.round;
  const report = analyzeEnvironment();
  state.modal = {
    type: 'environmental-report',
    report,
  };
  addLog(`📊 Investigação ambiental completa! Confira os resultados.`);
  renderModal();
}

// 📜 SISTEMA DE LEIS - Propor e votar
function proposeLaw(lawId) {
  const law = lawCatalog.find((l) => l.id === lawId);
  if (!law) return;
  if (law.passed) {
    addLog(`📜 Lei já aprovada: ${law.name}`);
    return;
  }
  const approval = state.approval * 0.9 + state.groups.ambientalistas * 0.1;
  if (approval > 70) {
    applyDelta(law.effect);
    law.passed = true;
    state.passedLaws.push(law.id);
    addLog(`📜 ✅ LEI APROVADA: ${law.name}`);
  } else {
    addLog(`📜 ❌ Lei rejeitada: ${law.name}`);
  }
  saveState();
  render();
}

function renderSocialFeed() {
  const list = document.getElementById('socialFeedList');
  if (!list) return;
  list.innerHTML = (state.socialFeed || []).map((post) => `
    <li class="social-item">
      <strong>${post.user}</strong>
      <span>${post.text}</span>
    </li>
  `).join('');
}

function renderSecretMissions() {
  const list = document.getElementById('secretMissionList');
  if (!list) return;

  list.innerHTML = secretMissions.map((mission) => {
    const completed = state.completedMissions.includes(mission.id);
    const progress = mission.condition() ? 'Concluída' : mission.goal;
    return `
      <li class="mission-item ${completed ? 'complete' : ''}">
        <strong>${completed ? '✅' : '🔒'} ${mission.name}</strong>
        <span>${progress}</span>
      </li>
    `;
  }).join('');
}

function bindTabs() {
  const tabs = document.querySelectorAll('.tab');
  if (!tabs.length) return;

  tabs.forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));
      document.querySelectorAll('.action-panel').forEach((panel) => panel.classList.remove('active'));
      button.classList.add('active');
      const targetPanel = document.getElementById(button.dataset.panel);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

function bindControls() {
  const saveBtn = document.getElementById('saveBtn');
  const continueBtn = document.getElementById('continueBtn');
  const newGameBtn = document.getElementById('newGameBtn');
  const nextRoundBtn = document.getElementById('nextRoundBtn');
  const endMandateBtn = document.getElementById('endMandateBtn');

  if (saveBtn) saveBtn.addEventListener('click', saveState);
  if (continueBtn) continueBtn.addEventListener('click', () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const loaded = JSON.parse(saved);
      Object.assign(state, loaded);
      render();
      addLog('💾 Jogo continuado com sucesso.');
    }
  });
  if (newGameBtn) newGameBtn.addEventListener('click', () => {
    const fresh = createInitialState();
    Object.assign(state, fresh);
    state.currentEvent = null;
    saveState();
    render();
  });
  if (nextRoundBtn) nextRoundBtn.addEventListener('click', nextRound);
  if (endMandateBtn) endMandateBtn.addEventListener('click', showFinalReport);
}

function render() {
  renderStats();
  renderEvent();
  renderLogs();
  renderSecretMissions();
  renderSocialFeed();
  renderActionButtons();
  renderAchievements();
  renderRanking();
  renderModal();
}

if (!state.socialFeed || !state.socialFeed.length) {
  generateSocialFeed();
}

bindTabs();
bindControls();

const startGameBtn = document.getElementById('startGameBtn');
if (startGameBtn) {
  startGameBtn.addEventListener('click', () => {
    const overlay = document.getElementById('introOverlay');
    if (overlay) overlay.classList.add('hidden');
    addLog('🎓 Tutorial: comece com ações pequenas e equilibradas para estabilizar a cidade.');
    render();
  });
}

triggerRandomEvent();
render();

window.addEventListener('beforeunload', () => saveRanking());
