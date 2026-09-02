/* ============================================================
   main.js — comportamento do site
   Samuel Quirino Advocacia

   Não é necessário editar este arquivo para publicar o site.
   Os dados ficam em js/config.js.
   ============================================================ */

(function () {
  'use strict';

  const CHAVE_TEMA = 'sq-tema';
  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------
     Utilidades
     -------------------------------------------------------- */

  /** Um valor de config só vale se existir e não for placeholder [[...]]. */
  function preenchido(valor) {
    return typeof valor === 'string'
      && valor.trim() !== ''
      && !/^\[\[.*\]\]$/.test(valor.trim());
  }

  function cadaElemento(seletor, fn) {
    document.querySelectorAll(seletor).forEach(fn);
  }

  /* --------------------------------------------------------
     Tema claro / escuro
     -------------------------------------------------------- */

  function initTema() {
    const botao = document.getElementById('botao-tema');
    if (!botao) return;

    const raiz = document.documentElement;

    function sincronizar() {
      const escuro = raiz.getAttribute('data-theme') === 'dark';
      botao.setAttribute('aria-pressed', String(escuro));
      botao.setAttribute('aria-label', escuro ? 'Ativar modo claro' : 'Ativar modo escuro');
    }

    sincronizar();

    botao.addEventListener('click', function () {
      const escuro = raiz.getAttribute('data-theme') === 'dark';
      const novo = escuro ? 'light' : 'dark';

      raiz.setAttribute('data-theme', novo);
      try {
        localStorage.setItem(CHAVE_TEMA, novo);
      } catch (e) {
        /* Navegação privativa pode bloquear: o tema vale só nesta sessão. */
      }
      sincronizar();
    });

    // Se a pessoa nunca escolheu manualmente, acompanha o sistema.
    const consultaSistema = window.matchMedia('(prefers-color-scheme: dark)');
    const aoMudarSistema = function (evento) {
      let salvo = null;
      try {
        salvo = localStorage.getItem(CHAVE_TEMA);
      } catch (e) { /* ignora */ }

      if (!salvo) {
        raiz.setAttribute('data-theme', evento.matches ? 'dark' : 'light');
        sincronizar();
      }
    };

    if (consultaSistema.addEventListener) {
      consultaSistema.addEventListener('change', aoMudarSistema);
    } else if (consultaSistema.addListener) {
      consultaSistema.addListener(aoMudarSistema);
    }
  }

  /* --------------------------------------------------------
     Menu mobile
     -------------------------------------------------------- */

  function initMenu() {
    const botao = document.getElementById('hamburguer');
    const nav = document.getElementById('nav-principal');
    const overlay = document.getElementById('overlay-menu');
    if (!botao || !nav || !overlay) return;

    function abrir() {
      nav.classList.add('aberto');
      overlay.hidden = false;
      botao.setAttribute('aria-expanded', 'true');
      botao.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('menu-aberto');
    }

    function fechar() {
      nav.classList.remove('aberto');
      overlay.hidden = true;
      botao.setAttribute('aria-expanded', 'false');
      botao.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('menu-aberto');
    }

    function aberto() {
      return botao.getAttribute('aria-expanded') === 'true';
    }

    botao.addEventListener('click', function () {
      if (aberto()) {
        fechar();
      } else {
        abrir();
      }
    });

    overlay.addEventListener('click', fechar);

    // Clicar em um link do menu leva à seção e fecha o painel.
    nav.addEventListener('click', function (evento) {
      if (evento.target.closest('a') && aberto()) {
        fechar();
      }
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && aberto()) {
        fechar();
        botao.focus();
      }
    });

    // Ao voltar para o desktop, o painel não deve continuar "aberto".
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && aberto()) {
        fechar();
      }
    });
  }

  /* --------------------------------------------------------
     Sombra do cabeçalho ao rolar
     -------------------------------------------------------- */

  function initCabecalho() {
    const cabecalho = document.getElementById('cabecalho');
    const flutuante = document.getElementById('wa-flutuante');
    if (!cabecalho) return;

    if (flutuante) {
      flutuante.hidden = false;
    }

    let pendente = false;

    function atualizar() {
      const y = window.scrollY;
      cabecalho.classList.toggle('rolado', y > 8);

      if (flutuante) {
        flutuante.classList.toggle('visivel', y > 300);
      }
      pendente = false;
    }

    window.addEventListener('scroll', function () {
      if (!pendente) {
        pendente = true;
        window.requestAnimationFrame(atualizar);
      }
    }, { passive: true });

    atualizar();
  }

  /* --------------------------------------------------------
     Link ativo conforme a seção visível
     -------------------------------------------------------- */

  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    const links = Array.from(document.querySelectorAll('.nav__link'));
    if (!links.length) return;

    const porId = new Map();
    const secoes = [];

    links.forEach(function (link) {
      const id = (link.getAttribute('href') || '').replace('#', '');
      const secao = id && document.getElementById(id);
      if (secao) {
        porId.set(id, link);
        secoes.push(secao);
      }
    });

    const observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;

        links.forEach(function (l) { l.classList.remove('ativo'); });

        const ativo = porId.get(entrada.target.id);
        if (ativo) {
          ativo.classList.add('ativo');
        }
      });
    }, {
      // Zona de leitura: um pouco abaixo do cabeçalho, até o meio da tela.
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0
    });

    secoes.forEach(function (secao) { observador.observe(secao); });
  }

  /* --------------------------------------------------------
     Animação de entrada
     -------------------------------------------------------- */

  function initRevelar() {
    const alvos = document.querySelectorAll('.js-revelar');
    if (!alvos.length) return;

    if (semAnimacao || !('IntersectionObserver' in window)) {
      document.body.classList.add('sem-animacao');
      return;
    }

    const observador = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada, indice) {
        if (!entrada.isIntersecting) return;

        // Pequeno escalonamento entre itens que entram juntos.
        const atraso = Math.min(indice * 70, 280);
        window.setTimeout(function () {
          entrada.target.classList.add('revelado');
        }, atraso);

        obs.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    alvos.forEach(function (alvo) { observador.observe(alvo); });

    // Rede de segurança: se por qualquer motivo o observador não disparar,
    // o conteúdo não pode ficar preso em opacity: 0.
    window.setTimeout(function () {
      alvos.forEach(function (alvo) { alvo.classList.add('revelado'); });
    }, 4000);
  }

  /* --------------------------------------------------------
     Preenchimento dos dados vindos de config.js
     -------------------------------------------------------- */

  function initDados() {
    if (typeof CONFIG === 'undefined') return;

    // Razão social
    if (preenchido(CONFIG.razaoSocial)) {
      cadaElemento('[data-campo="razao-social"]', function (el) {
        el.textContent = CONFIG.razaoSocial;
      });
    }

    // OAB — rodapé (com a sociedade, quando houver) e ficha do Samuel
    if (preenchido(CONFIG.oab)) {
      const partes = [CONFIG.oab];
      if (preenchido(CONFIG.oabSociedade)) {
        partes.push(CONFIG.oabSociedade);
      }

      cadaElemento('[data-campo="oab"]', function (el) {
        el.textContent = partes.join(' · ');
      });

      cadaElemento('[data-campo="oab-curto"]', function (el) {
        el.textContent = CONFIG.oab;
      });
    }

    // CNPJ
    if (preenchido(CONFIG.cnpj)) {
      cadaElemento('[data-campo="cnpj"]', function (el) {
        el.textContent = 'CNPJ ' + CONFIG.cnpj;
      });
    }

    // Telefone
    if (preenchido(CONFIG.telefoneExibicao)) {
      const digitos = String(CONFIG.telefoneExibicao).replace(/\D/g, '');
      cadaElemento('[data-campo="telefone-link"]', function (el) {
        el.textContent = CONFIG.telefoneExibicao;
        el.setAttribute('href', 'tel:+' + (digitos.length > 11 ? digitos : '55' + digitos));
      });
    }

    // E-mail
    if (preenchido(CONFIG.email)) {
      cadaElemento('[data-campo="email-link"]', function (el) {
        el.textContent = CONFIG.email;
        el.setAttribute('href', 'mailto:' + CONFIG.email);
      });
    }

    // Endereço e horário
    if (preenchido(CONFIG.endereco)) {
      cadaElemento('[data-campo="endereco"]', function (el) {
        el.textContent = CONFIG.endereco;
      });
    }

    if (preenchido(CONFIG.horario)) {
      cadaElemento('[data-campo="horario"]', function (el) {
        el.textContent = CONFIG.horario;
      });
    }

    // Redes sociais
    const redes = [
      { url: CONFIG.instagram, nome: 'Instagram' },
      { url: CONFIG.linkedin, nome: 'LinkedIn' }
    ].filter(function (rede) { return preenchido(rede.url); });

    if (redes.length) {
      cadaElemento('[data-campo="redes"]', function (lista) {
        redes.forEach(function (rede) {
          const item = document.createElement('li');
          const link = document.createElement('a');

          link.href = rede.url;
          link.textContent = rede.nome;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';

          item.appendChild(link);
          lista.appendChild(item);
        });
      });
    }

    // Ano corrente no rodapé
    cadaElemento('[data-campo="ano"]', function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    esconderNaoConfigurados();
    avisarPendencias();
  }

  /**
   * Enquanto um dado não for preenchido em config.js, o cartão correspondente
   * não deve aparecer meio vazio para o visitante — some da página.
   */
  function esconderNaoConfigurados() {
    const mapa = [
      { campo: 'telefone-link', valor: CONFIG.telefoneExibicao },
      { campo: 'email-link', valor: CONFIG.email },
      { campo: 'endereco', valor: CONFIG.endereco }
    ];

    mapa.forEach(function (item) {
      if (preenchido(item.valor)) return;

      cadaElemento('[data-campo="' + item.campo + '"]', function (el) {
        const cartao = el.closest('.contato__item');
        if (cartao) {
          cartao.hidden = true;
        } else {
          // No rodapé, o próprio item da lista sai.
          const li = el.closest('li');
          (li || el).hidden = true;
        }
      });
    });
  }

  /**
   * Aviso para quem está montando o site: lista o que ainda está com
   * placeholder. Fica só no console — o visitante não vê nada disso.
   */
  function avisarPendencias() {
    const obrigatorios = [
      ['oab', CONFIG.oab],
      ['whatsapp', CONFIG.whatsapp],
      ['telefoneExibicao', CONFIG.telefoneExibicao],
      ['email', CONFIG.email],
      ['endereco', CONFIG.endereco]
    ];

    const pendentes = obrigatorios
      .filter(function (par) { return !preenchido(par[1]); })
      .map(function (par) { return par[0]; });

    if (pendentes.length) {
      console.warn(
        '[Samuel Quirino Advocacia] Campos ainda não preenchidos em js/config.js: '
        + pendentes.join(', ')
        + '. Enquanto isso, esses trechos não aparecem no site.'
      );
    }
  }

  /* --------------------------------------------------------
     Links de WhatsApp
     O número existe em um lugar só (config.js); o assunto vem
     do atributo data-assunto de cada botão.
     -------------------------------------------------------- */

  function initWhatsapp() {
    if (typeof CONFIG === 'undefined' || !preenchido(CONFIG.whatsapp)) {
      // Sem número configurado, os botões que prometem WhatsApp somem em vez de
      // virar cliques mortos; os demais continuam levando à seção de contato.
      const flutuante = document.getElementById('wa-flutuante');
      if (flutuante) {
        flutuante.remove();
      }

      const ctaContato = document.querySelector('.contato__cta');
      if (ctaContato) {
        ctaContato.hidden = true;
      }
      return;
    }

    const numero = String(CONFIG.whatsapp).replace(/\D/g, '');
    const modelo = CONFIG.mensagemWhatsapp
      || 'Olá! Vim pelo site e gostaria de falar sobre {assunto}.';

    cadaElemento('.js-whatsapp', function (el) {
      const assunto = el.getAttribute('data-assunto') || 'uma orientação jurídica';
      const texto = modelo.replace('{assunto}', assunto);

      el.setAttribute(
        'href',
        'https://wa.me/' + numero + '?text=' + encodeURIComponent(texto)
      );
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* --------------------------------------------------------
     Inicialização
     -------------------------------------------------------- */

  function iniciar() {
    initTema();
    initMenu();
    initCabecalho();
    initScrollSpy();
    initDados();
    initWhatsapp();
    initRevelar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
