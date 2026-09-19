Projeto Torres de Hanói

Estrutura:
- index.html: estrutura da interface
- css/style.css: aparência
- js/script.ts: código-fonte em TypeScript
- js/script.js: JavaScript compilado usado pelo navegador

Para abrir:
1. Abra index.html no navegador.

Se alterar script.ts, compile novamente:
tsc js/script.ts --target ES2017 --lib DOM,ES2017 --outFile js/script.js

A função hanoi() contém o algoritmo recursivo principal.
