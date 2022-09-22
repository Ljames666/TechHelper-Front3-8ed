// Crie uma função que receba 3 objetos contendo nota e peso,
//  realize a média das notas considerando o peso.
// Ex: (N1*P1) + (N2*P2) + (N3*P3) / 3 = Resultado

export interface Nota {
  nota: number;
  peso: number;
}

export function mediaponderada(data: Nota, data2: Nota, data3: Nota): number {
  const n1 = data.nota * data.peso;
  const n2 = data2.nota * data2.peso;
  const n3 = data3.nota * data3.peso;
  const soma = n1 + n2 + n3;
  const media = soma / 3;
  return media;
}
