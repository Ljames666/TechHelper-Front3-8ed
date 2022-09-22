import { Aluno } from "./cadastro_utils";


function list(lista: Array<Aluno>) {
    for (const valor of lista) {
        const { matricula, nome, turma, turno, idade, notas } = valor;
        console.log('---------------');
        console.log('matricula -->', matricula);
        console.log('nome -->', nome);
        console.log('turma -->', turma);
        console.log('turno -->', turno);
        console.log('idade -->', idade);
        console.log('notas -->', notas);
        console.log('---------------');
        console.log('');
    }
}

export default list;