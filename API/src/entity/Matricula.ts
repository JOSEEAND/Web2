import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cursos } from "./Cursos";
import { Estudiante } from "./Estudiante";


@Entity()
export class Matricula {

    @PrimaryColumn()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    IDMatricula: number;

    @ManyToOne(() => Cursos, (cursos) => cursos.Matriculas)
    @JoinColumn({ name: 'IDCurso' })
    Cursos: Cursos;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.Matriculas)
    @JoinColumn({ name: 'IDEstudiante' })
    Estudiantes: Estudiante;

    @Column({ default: true })
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Estado: boolean;
}