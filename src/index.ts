import express = require("express");
import { AppDataSource } from "./data-source"
import routes from "./routes";
import helmet from "helmet";
import cors = require("cors");


const port=process.env.port || 3000;
AppDataSource.initialize().then(async () => {

    const app=express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use('',routes);

    app.listen(port,()=>{console.log(`Puerto del servidor: ${port}`)});
    
}).catch(error => console.log(error))
