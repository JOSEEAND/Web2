import { Router } from "express";
import DetalleFacturaController from "../controllers/DetalleFacturaController";

const routes=Router();

routes.get('/',DetalleFacturaController.getAll);
routes.get('/:idDetalleFactura',DetalleFacturaController.getById);
routes.post('/',DetalleFacturaController.add);
routes.patch('/',DetalleFacturaController.update);
routes.delete('/:idDetalleFactura',DetalleFacturaController.delete);

export default routes;