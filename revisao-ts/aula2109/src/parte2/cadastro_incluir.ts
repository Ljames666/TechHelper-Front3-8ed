// let matricula:number = 0

import { Aluno, listaAlunos } from "./cadastro_utils";

function incluir(estudante: Aluno) {
    const arrayList = listaAlunos
    arrayList.push(estudante)
}

export default incluir


