import { Router } from "express";
import EstudianteController from "../controller/EstudianteController";


const routes = Router();

routes.get('/', EstudianteController.getAll);
routes.get('/:id', EstudianteController.getById);
routes.post('/', EstudianteController.create);
routes.patch('/', EstudianteController.update);
routes.delete('/:id', EstudianteController.delete);

export default routes;