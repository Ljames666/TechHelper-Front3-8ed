import list from "./cadastro_listar";
import { Aluno, listaAlunos } from "./cadastro_utils";
// function excluir({matricula, nome}: Partial<Aluno>) {

// }

function excluir(matricula: number) {
    const listaAtualizada = listaAlunos.filter(value => value.matricula !== matricula)
    list(listaAtualizada)
}

export default excluir;