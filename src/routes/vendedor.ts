import { Router } from "express";
import { VendedorController } from "../controllers/VendedorController";


const routes=Router();

routes.get('/:codigo',VendedorController.getById);
routes.post('/',VendedorController.add);
routes.patch('/:codigo',VendedorController.update);
routes.delete('/:codigo',VendedorController.delete);

export default routes;