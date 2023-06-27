import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Persona{

    @PrimaryColumn()
    @IsNotEmpty({message:'Debe ingresar valores'})
    codigo:number;
    @Column()
    @IsNotEmpty({message:'Debe ingresar valores'})
    nombre:string;
    @Column()
    @IsNotEmpty({message:'Debe ingresar valores'})
    apellidos:string;
    @Column()
    @IsNotEmpty({message:'Debe ingresar valores'})
    telefono:number;
    @Column()
    @IsNotEmpty({message:'Debe ingresar valores'})
    direccion:string;
}