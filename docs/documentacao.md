# 📚 Documentação — Torre de Hanói

Documentação técnica e acadêmica do projeto, complementar ao [README](../README.md).

---

## 📖 Sumário

1. [Introdução](#-introdução)
2. [Contexto histórico](#-contexto-histórico)
3. [Regras do jogo](#-regras-do-jogo)
4. [O algoritmo recursivo](#-o-algoritmo-recursivo)
5. [Complexidade](#-complexidade)
6. [Arquitetura do projeto](#-arquitetura-do-projeto)
7. [Referências](#-referências)

---

## 🧭 Introdução

A Torre de Hanói é um problema clássico utilizado no ensino de **algoritmos**, **recursão** e **estruturas de dados**. Este documento detalha o funcionamento do jogo, o algoritmo implementado e as decisões técnicas tomadas pela equipe.

---

## 🏛️ Contexto histórico

O quebra-cabeça foi inventado em **1883** pelo matemático francês **Édouard Lucas**, sob o pseudônimo de "N. Claus de Siam". A lenda associada conta que monges em um templo de Benares moviam 64 discos de ouro seguindo as regras do jogo; quando terminassem, o mundo acabaria.

> 💡 Curiosidade matemática: mesmo a 1 movimento por segundo, resolver 64 discos levaria cerca de **585 bilhões de anos**.

---

## 🎯 Regras do jogo

1. Existem **três pinos** (origem, auxiliar e destino).
2. Há **N discos** de tamanhos diferentes empilhados no pino de origem, do maior para o menor.
3. Apenas **um disco** pode ser movido por vez.
4. Um disco **nunca** pode ser colocado sobre outro menor.
5. O objetivo é mover todos os discos para o pino de destino.

---

## 🧠 O algoritmo recursivo

A solução ótima segue três passos:

1. Mover `n - 1` discos do pino **origem** para o pino **auxiliar**.
2. Mover o maior disco (o `n`-ésimo) da **origem** para o **destino**.
3. Mover os `n - 1` discos do **auxiliar** para o **destino**.

### Pseudocódigo

```
função hanoi(n, origem, auxiliar, destino):
    se n == 1:
        mover disco de origem para destino
        retornar
    hanoi(n - 1, origem, destino, auxiliar)
    mover disco de origem para destino
    hanoi(n - 1, auxiliar, origem, destino)
```

### Implementação em TypeScript

```ts
function hanoi(
  n: number,
  origem: string,
  auxiliar: string,
  destino: string,
  movimentos: string[] = [],
): string[] {
  if (n === 1) {
    movimentos.push(`Mover disco de ${origem} para ${destino}`);
    return movimentos;
  }

  hanoi(n - 1, origem, destino, auxiliar, movimentos);
  movimentos.push(`Mover disco de ${origem} para ${destino}`);
  hanoi(n - 1, auxiliar, origem, destino, movimentos);

  return movimentos;
}
```

> ✏️ Ajuste o trecho acima conforme a assinatura real usada em `src/ts/script.ts`.

---

## 📈 Complexidade

| Métrica                                    | Valor     |
| ------------------------------------------ | --------- |
| Número mínimo de movimentos                | `2^n − 1` |
| Complexidade de tempo                      | `O(2^n)`  |
| Complexidade de espaço (pilha de recursão) | `O(n)`    |

### Exemplos

| Discos (n) | Movimentos mínimos |
| ---------- | ------------------ |
| 1          | 1                  |
| 2          | 3                  |
| 3          | 7                  |
| 4          | 15                 |
| 5          | 31                 |
| 10         | 1.023              |
| 64         | ~1,8 × 10¹⁹        |

---

## 🏗️ Arquitetura do projeto

```
src/ts/script.ts   → lógica do jogo e algoritmo recursivo
css/style.css      → estilização e animações
index.html         → estrutura da página
js/script.js       → código compilado (gerado a partir do TS)
```

### Fluxo resumido

1. O usuário escolhe a quantidade de discos.
2. O algoritmo `hanoi()` gera a lista de movimentos.
3. A interface percorre essa lista e anima cada movimento na tela.

> ✏️ Complemente aqui conforme o projeto evoluir (ex: adicionar diagramas, fluxogramas, etc.).

---

## 📚 Referências

- LUCAS, Édouard. _Récréations Mathématiques_. 1883.
- CORMEN, T. H. et al. _Algoritmos: Teoria e Prática_. 3. ed. Elsevier, 2012.
- [Torre de Hanói — Wikipedia](https://pt.wikipedia.org/wiki/Torre_de_Han%C3%B3i)
- [Recursão — MDN Web Docs](https://developer.mozilla.org/pt-BR/docs/Glossary/Recursion)
