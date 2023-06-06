import { Router } from "express";
import DetalleFacturaController from "../controllers/DetalleFacturaController";

const routes=Router();

routes.get('/',DetalleFacturaController.getAll);

export default routes;