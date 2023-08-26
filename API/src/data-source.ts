import "reflect-metadata"
import { DataSource } from "typeorm"
import { Producto } from "./entity/Producto"
import { Usuario } from "./entity/Usuario"
import { Persona } from "./entity/Persona"
import { Cliente } from "./entity/Cliente"
import { TipoCliente } from "./entity/TipoCliente"
import { Factura } from "./entity/Factura"
import { DetalleFactura } from "./entity/DetalleFactura"
import { CategoriaProducto } from "./entity/CategoriaProducto"
import { Cursos } from "./entity/Cursos"
import { Estudiante } from "./entity/Estudiante"
import { Matricula } from "./entity/Matricula"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "prueba",
    synchronize: false, //cambiar a true si elimina la DB
    logging: false,
    entities: [Producto, Usuario, Persona, Cliente,
        TipoCliente, Factura, DetalleFactura,
        CategoriaProducto, Cursos, Estudiante,
        Matricula],
    migrations: [],
    subscribers: [],
})
