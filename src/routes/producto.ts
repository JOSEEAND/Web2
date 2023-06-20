import { Router } from "express";
import ProductoController from "../controllers/ProductoController";


const routes=Router();

routes.get('/:codigo',ProductoController.getById);
routes.post('/',ProductoController.add);
routes.patch('/:codigo',ProductoController.update);
routes.delete('/:codigo',ProductoController.delete);

export default routes;