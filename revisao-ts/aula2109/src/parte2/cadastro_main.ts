
import excluir from "./cadastro_excluir";
import incluir from "./cadastro_incluir";
import list from "./cadastro_listar";
import { Aluno, listaAlunos } from "./cadastro_utils";

const jamerson: Aluno = {
    matricula: 1,
    nome: 'Jamerson',
    turma: '5ªed',
    turno: 'noite',
    idade: 38,
    notas: [],
}

const mm: Aluno = {
    matricula: 2,
    nome: 'Matheus',
    turma: '8ªed',
    turno: 'noite',
    idade: 19,
    notas: [],
}

const breno: Aluno = {
    matricula: 3,
    nome: 'Breno',
    turma: '8ªed',
    turno: 'noite',
    idade: 31,
    notas: [],
}

incluir(jamerson)
// list(listaAlunos)
incluir(mm)
// list(listaAlunos)
incluir(breno)
list(listaAlunos)

excluir(2)