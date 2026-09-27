type Pino = "A" | "B" | "C";

type Movimento = {
  disco: number;
  origem: Pino;
  destino: Pino;
};

type Estado = Record<Pino, number[]>;

let movimentos: Movimento[] = [];
let estados: Estado[] = [];
let passoAtual = 0;

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

function iniciar(): void {
  const quantidade = Number(
    (document.querySelector("#numDiscos") as HTMLInputElement).value,
  );

  const origem = (document.querySelector("#origem") as HTMLSelectElement)
    .value as Pino;

  const auxiliar = (document.querySelector("#auxiliar") as HTMLSelectElement)
    .value as Pino;

  const destino = (document.querySelector("#destino") as HTMLSelectElement)
    .value as Pino;

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

  for (const pino of ["A", "B", "C"] as Pino[]) {
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

  const status = document.querySelector("#status") as HTMLElement;

  if (passoAtual === 0) {
    status.textContent =
      `Configuração inicial — ${movimentos.length} movimentos no total`;
  } else {
    const movimento = movimentos[passoAtual - 1];

    status.textContent =
      `Passo ${passoAtual} de ${movimentos.length}: mover disco ${movimento.disco} de ${movimento.origem} para ${movimento.destino}`;
  }

  renderizarHistorico();

  (document.querySelector("#anterior") as HTMLButtonElement).disabled =
    passoAtual === 0;

  (document.querySelector("#proximo") as HTMLButtonElement).disabled =
    passoAtual === movimentos.length;
}

function renderizarHistorico(): void {
  const lista = document.querySelector("#listaMovimentos") as HTMLOListElement;

  lista.innerHTML = "";

  for (let i = 0; i < passoAtual; i++) {
    const movimento = movimentos[i];
    const item = document.createElement("li");

    item.textContent =
      `Disco ${movimento.disco}: ${movimento.origem} → ${movimento.destino}`;

    lista.appendChild(item);
  }
}

function proximo(): void {
  if (passoAtual < movimentos.length) {
    passoAtual++;
    renderizar();
  }
}

function anterior(): void {
  if (passoAtual > 0) {
    passoAtual--;
    renderizar();
  }
}

function resolverAutomaticamente(): void {
  iniciar();

  const intervalo = setInterval(() => {
    if (passoAtual < movimentos.length) {
      passoAtual++;
      renderizar();
    } else {
      clearInterval(intervalo);
    }
  }, 1000);
}

(document.querySelector("#resolver") as HTMLButtonElement).addEventListener(
  "click",
  resolverAutomaticamente,
);

(document.querySelector("#proximo") as HTMLButtonElement).addEventListener(
  "click",
  proximo,
);

(document.querySelector("#anterior") as HTMLButtonElement).addEventListener(
  "click",
  anterior,
);

iniciar();