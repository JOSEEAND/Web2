import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";


export class ProductoController{

    static getById=async(req:Request, res:Response)=>{

        try {
            const codigo=parseInt(req.params["codigo"]);
            
            if(!codigo){
                return res.status(404).json({mensaje:"Producto no encontrado"})
            }

            const clientes=AppDataSource.getRepository(Producto);
            let producto;

            try {
                producto=await clientes.findOneOrFail({where:{ codigo }});
            } catch (error) {
                return res.status(404).json({ mensaje: "No se encontro el producto" });
            }

            return res.status(200).json(producto);
            
        } catch (error) {
            return res.status(400).json({mensaje:error});
        }
    }

    static add=async(req:Request,res:Response)=>{

        const {codigo,descripcion,precio,stockMaximo,
            stockMinimo,codigoProveedor}=req.body;

        if(!codigo || !descripcion || !precio || !stockMaximo 
            || !stockMinimo || precio<0 || stockMaximo<0 || stockMinimo<0){
            return res.status(404).json({mensaje:"Debe ingresar un valor valido"})
        }

        const productos=AppDataSource.getRepository(Producto);
        const buscar=await productos.findOne({where: {codigo}});

        if(buscar){
            return res.status(404).json({mensaje:"Producto existente"});
        }

        let producto=new Producto();
        producto.codigo=codigo;
        producto.descripcion=descripcion;
        producto.precio=precio;
        producto.stockMaximo=stockMaximo;
        producto.stockMinimo=stockMinimo;

        await productos.save(producto);
        return res.status(201).json({mensaje:"Producto insertado"});
    }
}

export default ProductoController;