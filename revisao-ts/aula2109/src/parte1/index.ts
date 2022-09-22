// import {twoNumbers as media} from './functionTwoNumbers';
import { mediaponderada, Nota } from './functionNotaPeso';
import { readPoints, twoNumbers } from './functionTwoNumbers';
import { twoNumbers as media } from './functionTwoNumbers';

const teste1: Nota = {
  nota: 6,
  peso: 2,
};
const teste2: Nota = {
  nota: 2,
  peso: 4,
};
const teste3: Nota = {
  nota: 10,
  peso: 1,
};

function main(): void {
  console.log('Hello');
  console.log('-----------------------------------');
  console.log('Welcome');
  console.log('-----------------------------------');
  //   const ex1 = media(20, 72);
  const ex1 = twoNumbers(20, 72);
  console.log('media ----', ex1);
  console.log('-----------------------------------');
  readPoints(6);
  readPoints(5);
  readPoints(ex1);
  console.log('-----------------------------------');
  const resultMedia = mediaponderada(teste1, teste2, teste3);
  console.log('media ponderada', resultMedia);
}

main();
