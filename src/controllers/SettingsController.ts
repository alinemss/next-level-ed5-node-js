import { Request, Response} from "express";

import {getCustomRepository} from "typeorm";
import {SettingsRepository} from "../repositories/SettingsRepository"

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

  async create(request: Request, response:Response){
  //const body = request.body
  //escrevemos no codigo de forma desestruturada sabendo que os parametros são {chat, username}

    const {chat, username} = request.body;
        
    const settingsRepository = getCustomRepository(SettingsRepository)
  
    const settings = settingsRepository.create({chat,username});
  
  await settingsRepository.save(settings);
  
  return response.json(settings)
  

  }


}


export {SettingsController}