//TENDI NADA DESSA PARTE => Olhei artigo e entendi rs
import {Router} from "express";
import { SettingsController } from "./controllers/SettingsController";

const routes = Router();

const settingsController = new SettingsController();

routes.post("/settings", settingsController.create)
routes.get("/settings", (request,response)=> {

 return response.json(
   {message:"Funcionando"})});

export {routes}