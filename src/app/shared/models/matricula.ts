import { Cursos } from "./curso";
import { Estudiante } from "./estudiante";

export interface Matriculas {
    IDMatricula: number;
    Estado: boolean;
    Cursos: Cursos[];
    Estudiantes: Estudiante[];
    //[] en curso y estudiante
}