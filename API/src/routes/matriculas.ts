import { Router } from "express";
import MatriculasController from "../controller/MatriculaController";

const routes = Router();

routes.get('/', MatriculasController.getAll);
routes.post('/', MatriculasController.create);
routes.patch('/', MatriculasController.update);

export default routes;