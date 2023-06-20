import { Router } from "express";
import cliente from "./cliente";
import producto from "./producto";
import proveedor from "./proveedor";
import vendedor from "./vendedor";
import factura from "./factura";
import detalleFactura from "./detalleFactura";


const routes=Router();

routes.use('/Clientes',cliente);
routes.use('/Proveedores',proveedor);
routes.use('/Productos',producto);
routes.use('/Vendedores',vendedor);
routes.use('/Facturas',factura);
routes.use('/Detalles',detalleFactura);

export default routes;