import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Persona } from "./Persona";
import { Producto } from "./Producto";


@Entity()
export class Proveedor{

    @PrimaryColumn()
    @IsNotEmpty({message:'Ingrese valores'})
    codigo:number;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    nombre:string;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    apellidos:string;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    direccion:string;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    provincia:string;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    telefono:number;

    @OneToOne(()=>Persona,{cascade:['insert','update']})
    @JoinColumn({name:'codigo'})
    persona:Persona;

    @OneToMany(()=>Producto,(producto)=>producto.proveedor)
    productos:Producto[];
}