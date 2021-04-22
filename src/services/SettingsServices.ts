import {getCustomRepository} from "typeorm";
import {SettingsRepository} from "../repositories/SettingsRepository"


//Ainda sem entender bem a funcionalidade da interface

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService{

  async create({chat,username}:ISettingsCreate){
           
    const settingsRepository = getCustomRepository(SettingsRepository);

    const userAlreadyExist = await settingsRepository.findOne({username,});
   
    
    // trow passa essa informação para a camada de cima ..controller
    if(userAlreadyExist){
      throw new Error("User already exist");
    }
    
    const settings = settingsRepository.create({chat,username});
  
    await settingsRepository.save(settings);

    return (settings);
  }
}

export {SettingsService}