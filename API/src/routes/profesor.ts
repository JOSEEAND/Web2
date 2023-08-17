import { Router } from "express";
import ProfesorController from "../controller/ProfesorController";


const routes = Router();

routes.get('/', ProfesorController.getAll);
routes.get('/:id', ProfesorController.getById);
routes.post('/', ProfesorController.create);
routes.patch('/', ProfesorController.update);
routes.delete('/:id', ProfesorController.delete);

export default routes;