import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entity/Factura";
import { Vendedor } from "../entity/Vendedor";
import { Cliente } from "../entity/Cliente";
import { DetalleFactura } from "../entity/DetalleFactura";
import { validate } from "class-validator";
import { errorMonitor } from "events";


export class FacturaController{

    static getAll=async(req:Request,res:Response)=>{

        try {
            const facturas=AppDataSource.getRepository(Factura);
            const listaFacturas=await facturas.find({where:{estado:true},
                relations:{detallesFactura:{producto:true}}});

            if(listaFacturas.length==0){
                return res.status(404).json({mensaje:"No se encontraron facturas"});
            }

            return res.status(200).json({listaFacturas});
        } catch (error) {
            return res.status(400).json({error});
        }
    }

    static getById=async(req:Request,res:Response)=>{

        try {
            const idFactura=parseInt(req.params['idFactura']);

            if(!idFactura){
                return res.status(404).json({message:'No encontrada'});
            }

            const facturaRepo=AppDataSource.getRepository(Factura);
            let factura;

            try {
                factura=await facturaRepo.findOneOrFail({where:{idFactura,estado:true},
                relations:{detallesFactura:{producto:true}}});
            } catch (error) {
                return res.status(404).json({message:'No encontrado'});
            }

            return res.status(200).json(factura);
            
        } catch (error) {
            return res.status(404).json({message:error});
        }
    }

    static add=async(req:Request,res:Response)=>{

        /*
            "idFactura": 2,
            "codigoCliente": 3,
            "codigoVendedor": 2,
            "codigoProducto": 1,
            "cantidad": 29
        */

        try {
           const{idFactura,codigoCliente,codigoVendedor,
                cantidad,codigoProducto,idDetalle}=req.body;

           if(!idFactura||!codigoCliente||!codigoVendedor
            ||!cantidad||!codigoProducto){
                return res.status(404).json({message:'Debe ingresar valores validos'});
            }

            const facturaRepo=AppDataSource.getRepository(Factura);
            const detalleRepo=AppDataSource.getRepository(DetalleFactura);
            let facturas:Factura;
            let detalles:DetalleFactura;

            try {
                facturas=await facturaRepo.findOne({where:{idFactura}});
                detalles=await detalleRepo.findOne({where:{idFactura}});
            } catch (error) {
                return res.status(404).json({message:'Factura o detalle existente'});
            }

            const fecha =new Date();
            const fac=new Factura();
            const det=new DetalleFactura();
            fac.idFactura=idFactura;
            fac.fecha=fecha;
            fac.cliente=codigoCliente;
            fac.vendedor=codigoVendedor;
            fac.estado=true;

            det.idFactura=idFactura;
            det.codigoProducto=codigoProducto;
            det.cantidad=cantidad;
            det.estado=true;

            const errosFactura=await validate(fac,{
                validationError:{target: false, value:false },
            });
            if (errosFactura.length > 0) {
                return res.status(400).json(errosFactura);
            }

            const errosDetalles=await validate(det,{
                validationError:{target: false, value:false},
            });
            if(errosDetalles.length>0){
                return res.status(400).json(errosDetalles);
            }

            try {
                await facturaRepo.save(fac);
            } catch (error) {
                return res.status(404).json({message:'No se pudo guardar'});
            }

            try {
                await detalleRepo.save(det);
                return res.status(201).json({message:'Factura guardada exitosamente'});
            } catch (error) {
                return res.status(404).json({message:'Ocurrio un error'});
            }
        } catch (error) {
            return res.status(400).json({message:error});
        }
    }

    static update=async(req:Request,res:Response)=>{

        try {
            const idFactura=parseInt(req.params['idFactura']);
            const{codigoCliente,codigoVendedor,
                cantidad,codigoProducto,idDetalle}=req.body;

           if(!idFactura||!codigoCliente||!codigoVendedor
            ||!cantidad||!codigoProducto){
                return res.status(404).json({message:'Debe ingresar valores validos'});
            }

            const facturaRepo=AppDataSource.getRepository(Factura);
            const detalleRepo=AppDataSource.getRepository(DetalleFactura);
            let facturas:Factura;
            let detalles:DetalleFactura;

            try {
                facturas=await facturaRepo.findOneOrFail({where:{idFactura}});
                detalles=await detalleRepo.findOneOrFail({where:{idFactura}});
            } catch (error) {
                return res.status(404).json({message:'Factura o detalle existente'});
            }

            const fecha=new Date();
            const fac=new Factura();
            const det=new DetalleFactura();
            fac.idFactura=idFactura;
            fac.fecha=fecha;
            fac.cliente=codigoCliente;
            fac.vendedor=codigoVendedor;
            fac.estado=true;

            det.idFactura=idFactura;
            det.codigoProducto=codigoProducto;
            det.cantidad=cantidad;
            det.estado=true;

            const errosFactura=await validate(fac,{
                validationError:{target: false, value:false },
            });
            if (errosFactura.length > 0) {
                return res.status(400).json(errosFactura);
            }

            const errosDetalles=await validate(det,{
                validationError:{target: false, value:false},
            });
            if(errosDetalles.length>0){
                return res.status(400).json(errosDetalles);
            }

            try {
                await facturaRepo.save(fac);
                await detalleRepo.save(det);
                return res.status(201).json({message:'Factura actualizada'});
            } catch (error) {
                return res.status(404).json({message:'No se pudo actualizar'});
            }
        } catch (error) {
            return res.status(404).json({message:error});
        }
    }

    static delete=async(req:Request,res:Response)=>{

        try {
            const idFactura=parseInt(req.params['idFactura']);

            if(!idFactura){
                return res.status(404).json({message:'Ingrese el id de la fcatura'});
            }

            const facturaRepo=AppDataSource.getRepository(Factura);
            const detalleRepo=AppDataSource.getRepository(DetalleFactura);
           
            const facturs=await facturaRepo.findOne({where:{idFactura},
            relations:['detallesFactura']});

            if(!facturs){
                return res.status(404).json({message:'No se encontro'});
            }

            facturs.estado=false;

            try {
                await detalleRepo.save(facturs.detallesFactura);
                await facturaRepo.save(facturs);
                return res.status(200).json({message:'Factura eliminada correctamente'});
            } catch (error) {
                return res.status(404).json({message:'No se pudo eliminar'});
            }
        } catch (error) {
            return res.status(404).json({message:error});
        }
    }
}

export default FacturaController;