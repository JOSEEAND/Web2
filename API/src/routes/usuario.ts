import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { checkjwt } from "../middleware/jwt";

const routes = Router();

routes.get("/", /*checkjwt,*/UsuarioController.getAll);
routes.get("/:id", UsuarioController.getById);
routes.post("/", UsuarioController.add);
routes.patch("/", UsuarioController.update);
routes.delete("/:id", UsuarioController.delete);

export default routes;
