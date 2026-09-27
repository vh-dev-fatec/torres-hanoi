function torresDeHanoi(
  n: number,
  origem: string,
  auxiliar: string,
  final: string,
) {
  if (n === 1) {
    console.log(`Mover disco ${n} da torre ${origem} para a torre ${final}`);
    return;
  }
  torresDeHanoi(n - 1, origem, final, auxiliar);
  console.log(`Mover disco ${n} da torre ${origem} para a torre ${final}`);
  torresDeHanoi(n - 1, auxiliar, origem, final);
}

function quantMinMovimentos(n: number) {
  let totalMovimentos = 2 ** n - 1;
  console.log(
    "O minimo de movimentos possiveis para resolver é de: " + totalMovimentos,
  );
}
// altere o numero de discos para ver diferentes resoluções.
let nDiscos = 7;
console.log(`Resolução da Torre de Hanoi com ${nDiscos} discos.`);

// aqui chama o inicio da função para iniciar a resolução do problema
const inicio = performance.now();

torresDeHanoi(nDiscos, "A", "B", "C");

const fim = performance.now();
console.log(`Tempo: ${(fim - inicio).toFixed(2)} ms`);

quantMinMovimentos(nDiscos);
console.log("fim do problema.");
