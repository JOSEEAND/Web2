import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DetalleFactura } from "../entity/DetalleFactura";


export class DetalleFacturaController{

    static getAll=async(req:Request,res:Response)=>{

        const detallesRepo=AppDataSource.getRepository(DetalleFactura);
        const listaDetalles=await detallesRepo.find();

        if(listaDetalles.length==0){
            return res.status(404).json({mensaje:"No hay facturas"});
        }

        return res.status(200).json(listaDetalles);
    }
}

export default DetalleFacturaController;