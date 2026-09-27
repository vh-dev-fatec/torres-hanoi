<div align="center">

# 🗼 Torre de Hanói

**Implementação interativa do clássico quebra-cabeça matemático com visualização passo a passo.**

[![GitHub last commit](https://img.shields.io/github/last-commit/vh-dev-fatec/torres-hanoi?style=for-the-badge)](https://github.com/vh-dev-fatec/torres-hanoi/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/vh-dev-fatec/torres-hanoi?style=for-the-badge)](https://github.com/vh-dev-fatec/torres-hanoi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

🔗 [Acesse a demonstração online](https://vh-dev-fatec.github.io/torres-hanoi/) _(ative o GitHub Pages)_

</div>

---

## 📌 Sobre o projeto

A **Torre de Hanói** é um quebra-cabeça matemático criado por Édouard Lucas em 1883. Ele é composto por três pinos e uma quantidade de discos de tamanhos diferentes. O objetivo é mover todos os discos do pino inicial para o pino final, seguindo três regras:

1. Apenas um disco pode ser movido por vez.
2. Cada movimento consiste em pegar o disco superior de um pino e colocá-lo em outro pino.
3. Nenhum disco pode ser colocado sobre um disco menor.

Este projeto implementa o jogo de forma interativa, permitindo visualizar a solução passo a passo e compreender a lógica recursiva por trás do algoritmo.

## 🎮 Demonstração

![Demonstração da Torre de Hanói](https://upload.wikimedia.org/wikipedia/commons/6/60/Tower_of_Hanoi_4.gif)

## ✨ Funcionalidades

- [x] Interface interativa no navegador
- [x] Escolha da quantidade de discos
- [x] Resolução automática com animação
- [x] Contador de movimentos
- [x] Exibição do número mínimo de movimentos (\(2^n - 1\))
- [ ] Modo manual para o usuário jogar
- [ ] Níveis de dificuldade
- [ ] Ranking de movimentos

## 🛠️ Tecnologias

- **HTML5** – estrutura da página
- **CSS3** – estilização e animações
- **TypeScript** – lógica do jogo e algoritmo recursivo
- **JavaScript** – código compilado para execução no navegador

## 🚀 Como executar

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc.)
- [Node.js](https://nodejs.org/) e npm (opcional, apenas para compilar o TypeScript)

### Passo a passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/vh-dev-fatec/torres-hanoi.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd torres-hanoi
   ```

3. Abra o arquivo `index.html` no navegador.

   Se preferir usar um servidor local:

   ```bash
   npx serve .
   ```

4. (Opcional) Para compilar o TypeScript:
   ```bash
   npm install
   npm run build
   ```

## 📁 Estrutura do projeto

```
torres-hanoi/
├── assets/
│   ├── img/
│   │   ├── banner.png
│   │   ├── demo.gif
│   │   └── screenshot.png
│   └── favicon.ico
├── css/
│   └── style.css
├── js/
│   └── script.js
├── src/
│   └── ts/
│       └── script.ts
├── docs/
│   └── documentacao.md
├── index.html
├── LICENSE
├── README.md
├── package.json
└── tsconfig.json
```

- `assets/`: imagens, GIFs e ícones.
- `css/`: folhas de estilo.
- `js/`: código JavaScript compilado.
- `src/ts/`: código-fonte TypeScript.
- `docs/`: documentação extra.
- `index.html`: página principal.

## 🗺️ Roadmap

- [x] Estrutura inicial do projeto
- [x] Implementação do algoritmo recursivo
- [x] Visualização da solução
- [ ] Melhorar responsividade
- [ ] Adicionar modo manual
- [ ] Criar testes automatizados
- [ ] Publicar no GitHub Pages

## 🤝 Como contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feat/minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "feat: adiciona minha feature"
   ```
4. Faça push para a branch:
   ```bash
   git push origin feat/minha-feature
   ```
5. Abra um Pull Request.

## 👥 Autores

- [Vinicius Augusto](https://github.com/viniciusaugusto1997) – desenvolvimento
- [Henrique Camargo](https://github.com/henriqueptbd-cell) – desenvolvimento

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
Feito com 💙 por estudantes da FATEC.
</div>
