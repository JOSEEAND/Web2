//rutas principales y para cada ruta se asignan sus subrutas

import { Router } from "express";
import producto from "./productos";
import usuario from "./usuario";
import auth from "./auth";
import factura from "./factura";
import categorias from "./categorias";
import estudiante from "./estudiante";
import profesor from "./profesor";
import cursos from "./cursos";
import matriculas from "./matriculas";

const routes = Router();

routes.use("/Productos", producto);
routes.use("/Usuarios", usuario);
routes.use("/Auth", auth);
routes.use("/Facturas", factura);
routes.use("/Categorias", categorias);
routes.use("/Estudiantes", estudiante);
routes.use("/Profesores", profesor);
routes.use("/Cursos", cursos);
routes.use("/Matriculas", matriculas);


export default routes;
