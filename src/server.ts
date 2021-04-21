import express, { response } from 'express';


//nessa etapa não entendi as chaves na hora de importar
import {routes} from "./routes"

import "./database";

const app = express();

//*Rotas Antigas*
// // app.get("/",(request,response)=> {

// //   return response.json({

// //     message:"Olá NLW 05"
// //   }) 
// // })

// // app.post("/", (request, response)=>{
// //   return response.json({
// //     message: "Usuário salvo com Sucessos"
// //   })
// // })

app.use(express.json());
app.use(routes);
app.listen(3333, () => console.log ("Server is Running on 3333"))