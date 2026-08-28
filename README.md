# 🍔 Kaloca Burger

Website institucional e cardápio digital da **Kaloca Burger**, hamburgueria de bairro localizada no Horto Florestal, em Belo Horizonte — MG.

O projeto apresenta a casa, seus lanches, ambiente, localização e canais para pedido online ou pelo WhatsApp. A proposta visual combina referências de lanchonete de bairro, papel de embrulho, madeira e o vermelho característico da marca.

## ✨ Funcionalidades

- Página inicial com apresentação da hamburgueria, destaques, ambiente e localização.
- Cardápio digital organizado por categorias.
- Busca por itens do cardápio e filtros por categoria.
- Links diretos para pedido online e atendimento via WhatsApp.
- Menu responsivo para dispositivos móveis.
- Indicador automático de funcionamento conforme o horário de Belo Horizonte.
- Carregamento condicional de fotos dos produtos: quando uma imagem ainda não existe, o card mantém um placeholder visual.
- Navegação acessível, incluindo atalho para pular ao conteúdo e controles com atributos ARIA.

## 🛠 Tecnologias

- HTML5
- CSS3
- JavaScript puro (Vanilla JS)
- Google Fonts: Anton, Barlow e Caveat

O projeto não depende de frameworks, bibliotecas ou etapa de compilação.

## 📁 Estrutura do projeto

```text
Kaloca_Burger/
├── assets/
│   └── img/
│       ├── cardapio/          # Fotos dos itens do cardápio
│       ├── ambiente-*.jpg     # Fotos do salão
│       └── destaque-*.jpg     # Fotos dos lanches e destaques
├── css/
│   └── style.css              # Estilos compartilhados
├── js/
│   └── script.js              # Interações da interface
├── cardapio.html              # Página do cardápio
└── index.html                 # Página inicial
```

## 🚀 Como executar

Como é um site estático, basta abrir o arquivo `index.html` em um navegador.

Para uma experiência de desenvolvimento mais prática, abra a pasta do projeto em um editor que ofereça servidor local — por exemplo, a extensão **Live Server** do VS Code — e inicie uma prévia local.

## 🖼️ Páginas

| Página | Descrição |
| --- | --- |
| `index.html` | Apresentação da Kaloca Burger, destaques, salão, endereço e formas de pedido. |
| `cardapio.html` | Cardápio completo com filtros, busca e links para pedidos. |

## 📸 Screenshots

Adicione capturas de tela do projeto nesta seção quando houver uma versão publicada ou uma prévia local disponível.

```md
![Página inicial](./assets/img/screenshot-home.png)
![Cardápio](./assets/img/screenshot-cardapio.png)
```

## 🔧 Personalização

- Atualize o conteúdo e os preços diretamente em `cardapio.html`.
- Adicione fotos de itens na pasta `assets/img/cardapio/` e informe o caminho no atributo `data-foto` de cada card.
- Ajuste cores, tipografia e layout em `css/style.css`.
- Os links de WhatsApp e pedido online estão presentes nas páginas HTML e podem ser substituídos conforme a necessidade.
- O horário de atendimento é configurado no arquivo `js/script.js`.

## 💡 Melhorias futuras

- [ ] Integrar o cardápio a uma API ou painel administrativo.
- [ ] Adicionar carrinho de compras próprio.
- [ ] Implementar testes automatizados.
- [ ] Otimizar imagens para formatos modernos, como WebP ou AVIF.
- [ ] Adicionar métricas de acesso e conversão de pedidos.
- [ ] Publicar o site em uma plataforma de hospedagem.

## 🤝 Contribuição

1. Faça um fork deste repositório.
2. Crie uma branch para sua alteração: `git checkout -b feature/minha-melhoria`.
3. Faça o commit: `git commit -m "feat: adiciona minha melhoria"`.
4. Envie a branch: `git push origin feature/minha-melhoria`.
5. Abra um Pull Request.

## 📄 Licença

Este projeto ainda não possui uma licença definida. Antes de disponibilizá-lo publicamente, adicione um arquivo `LICENSE` adequado ao uso pretendido.

---

Feito para a **Kaloca Burger** — Horto Florestal, Belo Horizonte.
