import { Cursos } from "./curso";
import { Estudiante } from "./estudiante";

export interface Matriculas {
    IDMatricula: number;
    IDCurso: Cursos[];
    IDEstudiante: Estudiante[];
    Estado: boolean;
    //[] en curso y estudiante
}