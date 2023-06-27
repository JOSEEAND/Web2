import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { Vendedor } from './Vendedor';
import { IsNotEmpty } from 'class-validator';
import { DetalleFactura } from './DetalleFactura';


@Entity()
export class Factura {

    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'Ingrese valores'})
    idFactura:number;
    
    @Column(/*{type:'timestamp',default:()=>'CURRENT_TIMESTAMP'}*/)
    fecha:Date;

    @ManyToOne(()=>Cliente,{cascade:['remove']})
    @JoinColumn({name:'codigoCliente'})
    cliente:Cliente;

    @ManyToOne(()=>Vendedor,{cascade:['remove']})
    @JoinColumn({name:'codigoVendedor'})
    vendedor:Vendedor;

    @OneToMany(()=>DetalleFactura,(detalle)=>detalle.factura,{cascade:['insert','update']})
    detallesFactura:DetalleFactura[];

    @Column({default:true})
    estado:boolean;
}