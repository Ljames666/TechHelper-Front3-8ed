import { Nota } from "./functionNotaPeso";

export type Aluno = {
    matricula: number;
    nome: string;
    turma: string;
    turno: string;
    idade: number;
    notas: Array<Nota>;
}

export let listaAlunos: Array<Aluno> = []