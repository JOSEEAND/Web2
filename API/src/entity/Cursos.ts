import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Estudiante } from "./Estudiante";
import { Profesor } from "./Profesor";
import { Matricula } from "./Matricula";

@Entity()
export class Cursos {

    @PrimaryColumn()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    IDCurso: number;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    NombreCurso: string;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Sede: string;

    @OneToMany(() => Estudiante, (estudiante) => estudiante.Cursos)
    Estudiantes: Estudiante[];

    @OneToMany(() => Profesor, (profesor) => profesor.Cursos)
    Profesores: Profesor[];

    @OneToMany(() => Matricula, (matricula) => matricula.Cursos)
    Matriculas: Matricula[];

    @Column({ default: true })
    Estado: boolean;
}