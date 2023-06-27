import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Factura } from "./Factura";
import { Producto } from "./Producto";
import { IsNotEmpty } from "class-validator";


@Entity()
export class DetalleFactura{

    @PrimaryColumn()
    @IsNotEmpty({message:'Ingrese valores'})
    idFactura:number;

    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    codigoProducto:number;

    @Column()
    @IsNotEmpty({message:'Ingrese valores'})
    cantidad:number;

    @ManyToOne(()=>Factura,(factura)=>factura.detallesFactura,{cascade:['remove']})
    @JoinColumn({name:'idFactura'})
    factura:Factura;

    @ManyToOne(()=>Producto,(producto)=>producto.detallesFactura)
    @JoinColumn({name:'codigoProducto'})
    producto:Producto;

    @Column({default:true})
    estado:boolean;
}
