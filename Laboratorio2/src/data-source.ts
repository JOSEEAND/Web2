import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cliente } from "./entity/Cliente"
import { Producto } from "./entity/Producto"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"
import { Factura } from "./entity/Factura"
import { DetalleFactura } from "./entity/DetalleFactura"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "tienda",
    synchronize: true,
    logging: false,
    entities: [Cliente, Producto, Proveedor, Vendedor, Factura, DetalleFactura],
    migrations: [],
    subscribers: [],
})
