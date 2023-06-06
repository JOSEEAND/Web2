import { Router } from "express";
import ProveedorController from "../controllers/ProveedorController";


const routes=Router();

routes.get('/:codigo',ProveedorController.getById);
routes.post('/',ProveedorController.add);

export default routes;