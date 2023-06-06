import { Router } from "express";
import { FacturaController } from "../controllers/FacturaController";


const routes=Router();

routes.get('/',FacturaController.getAll);

export default routes;