import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entity/Factura";


export class FacturaController{

    static getAll=async(req:Request,res:Response)=>{

        try {
            const facturas=AppDataSource.getRepository(Factura);
            const listaFacturas=await facturas.find({where:{estado:true}});

            if(listaFacturas.length==0){
                return res.status(404).json({mensaje:"No se encontraron facturas"});
            }

            return res.status(200).json({listaFacturas});
        } catch (error) {
            return res.status(400).json({error});
        }
    }
}

export default FacturaController;