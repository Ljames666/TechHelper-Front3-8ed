// Crie uma função que receba 2 números e retorne a média.
function twoNumbers(num1: number, num2: number): number {
  const resultado: number = (num1 + num2) / 2;
  return resultado;
}

// Crie uma função que receba uma nota (número),
// caso essa nota seja menor que 6, exiba um console dizendo reprovado.
function readPoints(number: number): void {
  number < 6 ? console.log('reprovado') : console.log('aprovado');
}

export { twoNumbers, readPoints };

// export default twoNumbers;
