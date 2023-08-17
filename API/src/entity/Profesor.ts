import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cursos } from "./Cursos";


@Entity()
export class Profesor {

    @PrimaryColumn()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    IDProfesor: number;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Nombre: string;

    @Column()
    @IsNotEmpty({ message: 'Debe ingresar valores' })
    Apellidos: string;

    @ManyToOne(() => Cursos, (cursos) => cursos.Profesores)
    @JoinColumn({ name: 'IDCurso' })
    Cursos: Cursos;

    @Column({ default: true })
    Estado: boolean;
}