import { Cursos } from "./curso";

export interface Profesor {
    IDProfesor: number;
    Nombre: string;
    Apellidos: string;
    IDCurso: Cursos;
    Estado: boolean;
}