let movimentos = [];
let estados = [];
let passoAtual = 0;
// Gera todos os movimentos usando recursão.
function hanoi(n, origem, auxiliar, destino) {
    // Caso-base: com um disco, basta movê-lo para o destino.
    if (n === 1) {
        movimentos.push({ disco: 1, origem, destino });
        return;
    }
    hanoi(n - 1, origem, destino, auxiliar);
    movimentos.push({ disco: n, origem, destino });
    hanoi(n - 1, auxiliar, origem, destino);
}
function iniciar() {
    const quantidade = Number(document.querySelector("#numDiscos").value);
    const origem = document.querySelector("#origem").value;
    const auxiliar = document.querySelector("#auxiliar").value;
    const destino = document.querySelector("#destino").value;
    if (quantidade < 1 || quantidade > 7) {
        alert("Escolha uma quantidade de 1 a 7 discos.");
        return;
    }
    if (origem === auxiliar || origem === destino || auxiliar === destino) {
        alert("Origem, auxiliar e destino devem ser diferentes.");
        return;
    }
    movimentos = [];
    estados = [];
    passoAtual = 0;
    hanoi(quantidade, origem, auxiliar, destino);
    const inicial = { A: [], B: [], C: [] };
    for (let disco = quantidade; disco >= 1; disco--) {
        inicial[origem].push(disco);
    }
    estados.push(copiarEstado(inicial));
    const atual = copiarEstado(inicial);
    for (const movimento of movimentos) {
        const disco = atual[movimento.origem].pop();
        if (disco !== undefined) {
            atual[movimento.destino].push(disco);
        }
        estados.push(copiarEstado(atual));
    }
    renderizar();
}
function copiarEstado(estado) {
    return {
        A: [...estado.A],
        B: [...estado.B],
        C: [...estado.C]
    };
}
function renderizar() {
    const estado = estados[passoAtual];
    if (!estado)
        return;
    for (const pino of ["A", "B", "C"]) {
        const elemento = document.querySelector(`#pino${pino}`);
        elemento.querySelectorAll(".disco").forEach(disco => disco.remove());
        for (const tamanho of estado[pino]) {
            const disco = document.createElement("div");
            disco.className = "disco";
            disco.textContent = String(tamanho);
            disco.style.width = `${25 + tamanho * 9}%`;
            elemento.appendChild(disco);
        }
    }
    const status = document.querySelector("#status");
    if (passoAtual === 0) {
        status.textContent = `Configuração inicial — ${movimentos.length} movimentos no total`;
    }
    else {
        const movimento = movimentos[passoAtual - 1];
        status.textContent = `Passo ${passoAtual} de ${movimentos.length}: mover disco ${movimento.disco} de ${movimento.origem} para ${movimento.destino}`;
    }
    renderizarHistorico();
    document.querySelector("#anterior").disabled = passoAtual === 0;
    document.querySelector("#proximo").disabled = passoAtual === movimentos.length;
}
function renderizarHistorico() {
    const lista = document.querySelector("#listaMovimentos");
    lista.innerHTML = "";
    for (let i = 0; i < passoAtual; i++) {
        const movimento = movimentos[i];
        const item = document.createElement("li");
        item.textContent = `Disco ${movimento.disco}: ${movimento.origem} → ${movimento.destino}`;
        lista.appendChild(item);
    }
}
function proximo() {
    if (passoAtual < movimentos.length) {
        passoAtual++;
        renderizar();
    }
}
function anterior() {
    if (passoAtual > 0) {
        passoAtual--;
        renderizar();
    }
}
document.querySelector("#resolver").addEventListener("click", iniciar);
document.querySelector("#proximo").addEventListener("click", proximo);
document.querySelector("#anterior").addEventListener("click", anterior);
iniciar();
