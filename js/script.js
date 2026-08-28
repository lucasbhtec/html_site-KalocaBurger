/* =====================================================================
   KALOCA BURGER — script único (index.html + cardapio.html)
   JavaScript puro, sem dependências, funciona abrindo o arquivo
   direto no navegador (file://).
   ===================================================================== */
(function () {
  'use strict';

  /* -----------------------------------------------------------------
     1. MENU MOBILE
     ----------------------------------------------------------------- */
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav-principal');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto');
      menuBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    });

    // Fecha ao clicar em qualquer link do menu
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('aberto');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Fecha com Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('aberto')) {
        nav.classList.remove('aberto');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  /* -----------------------------------------------------------------
     2. ANO NO RODAPÉ
     ----------------------------------------------------------------- */
  var anos = document.querySelectorAll('[data-ano]');
  for (var i = 0; i < anos.length; i++) {
    anos[i].textContent = String(new Date().getFullYear());
  }

  /* -----------------------------------------------------------------
     3. ABERTO AGORA? — todos os dias, das 18h às 00h
     Usa o fuso de Belo Horizonte quando o navegador suporta, para que
     o aviso continue correto se o visitante estiver em outro fuso.
     ----------------------------------------------------------------- */
  function horaEmBH() {
    var agora = new Date();
    try {
      var partes = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).formatToParts(agora);

      var h = null, m = null;
      for (var i = 0; i < partes.length; i++) {
        if (partes[i].type === 'hour') { h = parseInt(partes[i].value, 10); }
        if (partes[i].type === 'minute') { m = parseInt(partes[i].value, 10); }
      }
      if (h !== null && m !== null) {
        return { hora: h === 24 ? 0 : h, minuto: m };
      }
    } catch (err) {
      /* Intl indisponível — cai no horário local do aparelho */
    }
    return { hora: agora.getHours(), minuto: agora.getMinutes() };
  }

  function atualizarStatusLoja() {
    var t = horaEmBH();
    // Abre às 18h e fecha à meia-noite, todos os dias.
    var aberto = t.hora >= 18;

    var faixa = document.querySelector('[data-status-loja]');
    if (faixa) {
      faixa.textContent = aberto ? 'Aberto agora — até 00h' : 'Abrimos hoje às 18h';
    }

    var selo = document.querySelector('[data-selo-aberto]');
    var seloTexto = document.querySelector('[data-selo-aberto-texto]');
    if (selo && seloTexto) {
      selo.hidden = false;
      selo.classList.toggle('fechado', !aberto);
      seloTexto.textContent = aberto ? 'Aberto agora — fechamos à meia-noite' : 'Fechado no momento — abrimos às 18h';
    }
  }

  atualizarStatusLoja();
  setInterval(atualizarStatusLoja, 60000);

  /* -----------------------------------------------------------------
     4. FOTOS DOS ITENS DO CARDÁPIO
     Cada card tem um espaço de imagem com nome de arquivo previsível
     em assets/img/cardapio/. Se o arquivo existir, ele entra no lugar
     do placeholder; se não existir, o placeholder permanece — sem
     ícone de imagem quebrada e sem precisar mexer no HTML.
     ----------------------------------------------------------------- */
  var espacos = document.querySelectorAll('.item-foto[data-foto]');
  for (var e = 0; e < espacos.length; e++) {
    (function (espaco) {
      var caminho = espaco.getAttribute('data-foto');
      if (!caminho) { return; }

      var teste = new Image();
      teste.onload = function () {
        var img = document.createElement('img');
        img.src = caminho;
        img.loading = 'lazy';
        var rotulo = espaco.querySelector('.aguardando');
        img.alt = rotulo ? rotulo.textContent.trim() : '';
        espaco.appendChild(img);
        espaco.classList.add('tem-foto');
      };
      teste.onerror = function () { /* segue com o placeholder */ };
      teste.src = caminho;
    })(espacos[e]);
  }

  /* -----------------------------------------------------------------
     5. FILTRO POR CATEGORIA + BUSCA (só na página do cardápio)
     ----------------------------------------------------------------- */
  var abas = document.querySelectorAll('.aba');
  var grupos = document.querySelectorAll('.grupo');
  var busca = document.getElementById('busca');
  var buscaLimpar = document.getElementById('busca-limpar');
  var semResultado = document.getElementById('sem-resultado');

  if (abas.length && grupos.length) {

    var filtroAtual = 'todos';

    function normalizar(txt) {
      return (txt || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    }

    function aplicar() {
      var termo = normalizar(busca ? busca.value.trim() : '');
      var totalVisivel = 0;

      for (var g = 0; g < grupos.length; g++) {
        var grupo = grupos[g];
        var daCategoria = (filtroAtual === 'todos' || grupo.dataset.grupo === filtroAtual);
        var visiveisNoGrupo = 0;

        var cards = grupo.querySelectorAll('.item');
        for (var c = 0; c < cards.length; c++) {
          var card = cards[c];
          var alvo = normalizar(
            (card.getAttribute('data-busca') || '') + ' ' + card.textContent
          );
          var casa = daCategoria && (termo === '' || alvo.indexOf(termo) !== -1);

          card.hidden = !casa;
          if (casa) { visiveisNoGrupo++; }
        }

        grupo.hidden = (visiveisNoGrupo === 0);

        var contador = grupo.querySelector('.qtd');
        if (contador) {
          contador.textContent = visiveisNoGrupo + (visiveisNoGrupo === 1 ? ' opção' : ' opções');
        }

        totalVisivel += visiveisNoGrupo;
      }

      if (semResultado) {
        semResultado.classList.toggle('visivel', totalVisivel === 0);
      }
      if (buscaLimpar) {
        buscaLimpar.classList.toggle('visivel', !!(busca && busca.value.length));
      }
    }

    // Abas
    for (var a = 0; a < abas.length; a++) {
      abas[a].addEventListener('click', function () {
        for (var k = 0; k < abas.length; k++) {
          abas[k].setAttribute('aria-selected', abas[k] === this ? 'true' : 'false');
        }
        filtroAtual = this.dataset.filtro;
        aplicar();

        // Leva o topo da lista para a posição de leitura
        var corpo = document.querySelector('.cardapio-corpo');
        var filtros = document.querySelector('.filtros');
        if (corpo && filtros && window.scrollY > corpo.offsetTop) {
          window.scrollTo({
            top: corpo.offsetTop - filtros.offsetHeight - 70,
            behavior: 'smooth'
          });
        }
      });
    }

    // Busca
    if (busca) {
      busca.addEventListener('input', aplicar);
      busca.addEventListener('search', aplicar);
    }
    if (buscaLimpar && busca) {
      buscaLimpar.addEventListener('click', function () {
        busca.value = '';
        aplicar();
        busca.focus();
      });
    }

    // Se a URL trouxer #categoria, já abre naquela aba
    if (window.location.hash) {
      var alvoHash = window.location.hash.replace('#', '');
      for (var h = 0; h < abas.length; h++) {
        if (abas[h].dataset.filtro === alvoHash) {
          abas[h].click();
          break;
        }
      }
    }

    aplicar();
  }

})();
