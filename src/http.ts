import express, { response } from 'express';
import {createServer} from "http";

//Essa parte do socket.io é apenas o server foi preciso instalar o client para as demais funções
//o IO gera um id pra conexão
import {Server, Socket} from "socket.io";
import path from "path";

//nessa etapa não entendi as chaves na hora de importar (quanto que tem chave e quanto n leve duvida)
import {routes} from "./routes"

import "./database";

const app = express();


//toda essa importação aqui do front me perdi to que nem barata tonta
app.use(express.static(path.join(__dirname,"..","public")));
app.set("views", path.join(__dirname,"..","public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (resquest, response)=> {
  return response.render("html/client.html");
})
app.get("/pages/admin", (resquest, response)=> {
  return response.render("html/admin.html");
})
const http = createServer(app); //Criando protocolo http não entendi nada dessa parte
const io = new Server(http); //Criando protocolo ws .... Não entendi foi nada


io.on("connection", (socket: Socket) => {
  console.log("Se Conectou", socket.id);

});
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
// app.listen(3333, () => console.log ("Server is Running on 3333"))

export { http, io }