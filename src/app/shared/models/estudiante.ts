import { Cursos } from "./curso";

export interface Estudiante {
    IDEstudiante: number;
    Nombre: string;
    Apellidos: string;
    IDCurso: Cursos;
    Estado: boolean;
}