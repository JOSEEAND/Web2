import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Proveedor } from "./Proveedor";
import { IsNotEmpty } from "class-validator";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Producto{

    @PrimaryColumn()
    @IsNotEmpty({message:'Ingrese valores'})
    codigo:number;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    descripcion:string;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    precio:number;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    stockMaximo:number;
    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    stockMinimo:number;

    @ManyToOne(()=>Proveedor, {cascade:['update']})
    @JoinColumn({name:'codigoProveedor'})
    proveedor:Proveedor;

    @OneToMany(()=>DetalleFactura,(detalle)=>detalle.producto)
    detallesFactura:DetalleFactura[];
}