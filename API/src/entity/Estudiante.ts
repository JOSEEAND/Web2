import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Cursos } from "./Cursos";
import { Matricula } from "./Matricula";


@Entity()
export class Estudiante {

    @PrimaryColumn()
    @IsNotEmpty({ message: 'Debe ingresar datos' })
    IDEstudiante: number;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Nombre: string;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Apellidos: string;

    @OneToMany(() => Matricula, (matricula) => matricula.Estudiantes)
    Matriculas: Matricula[];

    @Column({ default: true })
    Estado: boolean;
}