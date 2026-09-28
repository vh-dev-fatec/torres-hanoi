type Pino = "A" | "B" | "C";

type Movimento = {
  disco: number;
  origem: Pino;
  destino: Pino;
};

type Estado = Record<Pino, number[]>;

const pinos: Pino[] = ["A", "B", "C"];

const inputDiscos = document.querySelector("#numDiscos") as HTMLInputElement;
const selectOrigem = document.querySelector("#origem") as HTMLSelectElement;
const selectAuxiliar = document.querySelector("#auxiliar") as HTMLSelectElement;
const selectDestino = document.querySelector("#destino") as HTMLSelectElement;

const botaoResolver = document.querySelector("#resolver") as HTMLButtonElement;
const botaoReset = document.querySelector("#reset") as HTMLButtonElement;
const botaoAnterior = document.querySelector("#anterior") as HTMLButtonElement;
const botaoProximo = document.querySelector("#proximo") as HTMLButtonElement;

const statusExecucao = document.querySelector("#status") as HTMLElement;
const listaMovimentos = document.querySelector(
  "#listaMovimentos",
) as HTMLOListElement;

let movimentos: Movimento[] = [];
let estados: Estado[] = [];
let passoAtual = 0;
let intervaloAutomatico: ReturnType<typeof setInterval> | null = null;

// Gera todos os movimentos usando recursão.
function hanoi(n: number, origem: Pino, auxiliar: Pino, destino: Pino): void {
  // Caso-base: com um disco, basta movê-lo para o destino.
  if (n === 1) {
    movimentos.push({ disco: 1, origem, destino });
    return;
  }

  hanoi(n - 1, origem, destino, auxiliar);
  movimentos.push({ disco: n, origem, destino });
  hanoi(n - 1, auxiliar, origem, destino);
}

// Interrompe a resolução automática, caso esteja em execução.
function pararResolucaoAutomatica(): void {
  if (intervaloAutomatico !== null) {
    clearInterval(intervaloAutomatico);
    intervaloAutomatico = null;
  }
}

// Lê os controles e monta novamente todos os estados da solução.
function iniciar(): boolean {
  pararResolucaoAutomatica();

  const quantidade = Number(inputDiscos.value);
  const origem = selectOrigem.value as Pino;
  const auxiliar = selectAuxiliar.value as Pino;
  const destino = selectDestino.value as Pino;

  if (quantidade < 1 || quantidade > 7 || !Number.isInteger(quantidade)) {
    alert("Escolha uma quantidade de 1 a 7 discos.");
    return false;
  }

  if (origem === auxiliar || origem === destino || auxiliar === destino) {
    alert("Origem, auxiliar e destino devem ser diferentes.");
    return false;
  }

  movimentos = [];
  estados = [];
  passoAtual = 0;

  hanoi(quantidade, origem, auxiliar, destino);

  const inicial: Estado = {
    A: [],
    B: [],
    C: [],
  };

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

  return true;
}

function copiarEstado(estado: Estado): Estado {
  return {
    A: [...estado.A],
    B: [...estado.B],
    C: [...estado.C],
  };
}

function renderizar(): void {
  const estado = estados[passoAtual];

  if (!estado) return;

  for (const pino of pinos) {
    const elemento = document.querySelector(`#pino${pino}`) as HTMLElement;

    elemento.querySelectorAll(".disco").forEach((disco) => disco.remove());

    for (const tamanho of estado[pino]) {
      const disco = document.createElement("div");

      disco.className = "disco";
      disco.textContent = String(tamanho);
      disco.style.width = `${25 + tamanho * 9}%`;

      elemento.appendChild(disco);
    }
  }

  if (passoAtual === 0) {
    statusExecucao.textContent =
      `Configuração inicial — ${movimentos.length} movimentos no total`;
  } else {
    const movimento = movimentos[passoAtual - 1];

    statusExecucao.textContent =
      `Passo ${passoAtual} de ${movimentos.length}: mover disco ${movimento.disco} de ${movimento.origem} para ${movimento.destino}`;
  }

  renderizarHistorico();

  botaoAnterior.disabled = passoAtual === 0;
  botaoProximo.disabled = passoAtual === movimentos.length;
}

function renderizarHistorico(): void {
  listaMovimentos.innerHTML = "";

  for (let i = 0; i < passoAtual; i++) {
    const movimento = movimentos[i];
    const item = document.createElement("li");

    item.textContent =
      `Disco ${movimento.disco}: ${movimento.origem} → ${movimento.destino}`;

    listaMovimentos.appendChild(item);
  }
}

// Avança manualmente um movimento.
function proximo(): void {
  pararResolucaoAutomatica();

  if (passoAtual < movimentos.length) {
    passoAtual++;
    renderizar();
  }
}

// Volta manualmente um movimento.
function anterior(): void {
  pararResolucaoAutomatica();

  if (passoAtual > 0) {
    passoAtual--;
    renderizar();
  }
}

// Volta para a configuração inicial mantendo as opções selecionadas.
function resetar(): void {
  pararResolucaoAutomatica();
  passoAtual = 0;
  renderizar();
}

// Reinicia o problema e executa um movimento por segundo.
function resolverAutomaticamente(): void {
  if (!iniciar()) {
    return;
  }

  intervaloAutomatico = setInterval(() => {
    if (passoAtual < movimentos.length) {
      passoAtual++;
      renderizar();
    } else {
      pararResolucaoAutomatica();
    }
  }, 1000);
}

// Qualquer alteração nos dados reinicia imediatamente a configuração.
function atualizarConfiguracao(): void {
  iniciar();
}

botaoResolver.addEventListener("click", resolverAutomaticamente);
botaoReset.addEventListener("click", resetar);
botaoProximo.addEventListener("click", proximo);
botaoAnterior.addEventListener("click", anterior);

inputDiscos.addEventListener("input", atualizarConfiguracao);
selectOrigem.addEventListener("change", atualizarConfiguracao);
selectAuxiliar.addEventListener("change", atualizarConfiguracao);
selectDestino.addEventListener("change", atualizarConfiguracao);

iniciar();