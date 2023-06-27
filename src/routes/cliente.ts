import { Router } from "express";
import ClienteController from "../controllers/ClienteController";


const routes=Router();

routes.get('/',ClienteController.getAll);
routes.get('/:codigo',ClienteController.getById);
routes.post('/',ClienteController.add);
routes.patch('/:codigo',ClienteController.update);
routes.delete('/:codigo',ClienteController.delete);

export default routes;