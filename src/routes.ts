//TENDI NADA DESSA PARTE => Olhei artigo e entendi rs
import {Router} from "express";
import {SettingsController} from "./controllers/SettingsController";
import {UsersController} from "./controllers/UsersController";
import {MessagesController} from "./controllers/MessagesController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post("/settings", settingsController.create);
routes.get("/settings", (request,response)=> {

  return response.json(
    {message:"Funcionando"})});


routes.post("/users", usersController.create);
routes.get("/users", (request,response)=> {

  return response.json(
    {message:"Esse é Bom"})});   
 



// entre a rota e o parametro tive que colocar um espaço ainda n sei o pq
routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);


export {routes}




