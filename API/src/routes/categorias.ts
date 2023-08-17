import { Router } from "express";
import CategoriasController from "../controller/CategoriasController";

const routes = Router();

routes.get('/', CategoriasController.getAll);

export default routes;