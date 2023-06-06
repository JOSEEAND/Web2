import { Router } from "express";
import ClienteController from "../controllers/ClienteController";


const routes=Router();

routes.get('/:codigo',ClienteController.getById);
routes.post('/',ClienteController.add);

export default routes;