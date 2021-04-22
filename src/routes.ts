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
routes.post("/users", usersController.create);
routes.post("/messages", messagesController.create);


routes.get("/settings", (request,response)=> {

 return response.json(
   {message:"Funcionando"})});

export {routes}