/* ============================================================
   config.js — DADOS DO ESCRITÓRIO
   ------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA COLOCAR
   O SITE NO AR COM SEUS DADOS REAIS.

   Tudo que estiver entre [[colchetes duplos]] é um espaço
   reservado: troque pelo valor verdadeiro. Campos deixados em
   branco ("") simplesmente não aparecem no site.
   ============================================================ */

const CONFIG = {

  /* --- Identificação -------------------------------------- */

  // Razão social / nome usado no rodapé e no aviso de copyright.
  razaoSocial: 'Samuel Quirino Advocacia',

  // OBRIGATÓRIO pelo Provimento 205/2021 da OAB.
  // Exemplo: 'OAB/SP 123.456'
  oab: '[[OAB/UF 000.000]]',

  // Número de inscrição da SOCIEDADE de advogados, se houver.
  // Exemplo: 'Sociedade de Advogados OAB/SP 12.345'. Deixe '' se não houver.
  oabSociedade: '',

  // CNPJ do escritório. Deixe '' para não exibir.
  cnpj: '',

  /* --- Contato -------------------------------------------- */

  // WhatsApp SOMENTE DÍGITOS, com código do país (55) e DDD.
  // Exemplo: 5511987654321
  whatsapp: '[[5511999999999]]',

  // Telefone como você quer que apareça na tela.
  telefoneExibicao: '[[(11) 99999-9999]]',

  email: '[[contato@samuelquirino.adv.br]]',

  // Endereço em uma linha. Se o atendimento for só remoto, use algo como:
  // 'Atendimento remoto em todo o Brasil'
  endereco: '[[Rua Exemplo, 123, sala 4 — Bairro, Cidade/UF]]',

  horario: 'Segunda a sexta, das 9h às 18h',

  /* --- Redes sociais (deixe '' para ocultar o link) -------- */

  instagram: '',   // ex.: 'https://instagram.com/samuelquirinoadv'
  linkedin: '',    // ex.: 'https://linkedin.com/in/samuelquirino'

  /* --- Mensagem padrão do WhatsApp -------------------------
     O trecho {assunto} é substituído pelo data-assunto do botão
     que a pessoa clicou (ex.: "Direito Imobiliário").
     -------------------------------------------------------- */

  mensagemWhatsapp: 'Olá! Vim pelo site e gostaria de falar sobre {assunto}.'
};
