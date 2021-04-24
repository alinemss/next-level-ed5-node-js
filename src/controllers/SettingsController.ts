import { Request, Response} from "express";
import { SettingsService } from "../services/SettingsServices";


class SettingsController {
/**
 * Tipos de paramentros
 * Routes Params => Paramentros de rotas
 *    http://localhost:3333/setting/1
 * Query Params => Filtros e Buscas
 *    http://localhost:3333/setting/1?search=algumacoisa
 * Body Params => {
 *    json (objetos passando na rota)
 * }
 */
 async create(request: Request, response:Response) {
   
  const {chat, username} = request.body;
  console.log(request.body);
  const settingsService = new SettingsService();
try{
  const settings = await settingsService.create({chat,username});

  return response.json(settings);
}catch(err) {
  return response.status(400).json({message: err.message})
};
 }
  //const body = request.body
  //escrevemos no codigo de forma desestruturada sabendo que os parametros são {chat, username}
async findByUsername(request: Request, response: Response){

  const {username} = request.params;
  const settingsService = new SettingsService();

  const settings = await settingsService.findByUsername(username)

    return response.json(settings);


}

async update(request: Request, response: Response){

  const {username} = request.params;
  const {chat} = request.body;
  const settingsService = new SettingsService();

  const settings = await settingsService.update(username,chat)

    return response.json(settings);
 
 }
}; 
export {SettingsController}